#!/usr/bin/env node
'use strict'

require('./helpers/check-if-outdated')(function () {
  var fs = require('graceful-fs')
  var glob = require('glob')
  var split = require('split')

  var checkForDeprecations = require('./helpers/check-for-deprecations')
  var printSummary = require('./helpers/print-summary')

  var args = process.argv.slice(2)
  var filesAndOrFolders = args.length
    ? args.length === 1
      ? args + '{/**/*,}'
      : '{' + args.join(',') + '}{/**/*,}'
    : '**/*'

  glob(filesAndOrFolders, {
    nodir: true,
    ignore: [
      '**/.git/**/*',
      '**/node_modules/**/*',
      '**/tmp/**/*',
      '**/vendor/**/*',
      '**/cache/**/*',
      '**/logs/**/*',
      '**/dist/**/*',
      '**/*.+(jpeg|jpg|gif|png|svg|woff|woff2|ttf|otf|eot|log|zip|map|tar|gz|db|sqlite|sqlite3)',
      '**/(G|g)ulpfile.js'
    ]
  }, function (error, files) {
    if (error) throw error
    var deprecationsFound = false
    var fileChecks = files.map(function (file) {
      return new Promise(function (resolve, reject) {
        var lineNum = 0

        const writeFS = fs.createWriteStream(file + '.bak').on('ready', function (args) {
          debugger
        });

        let fileContent = '';
        fs.createReadStream(file)
          .pipe(split())
          .on('data', function (line) {
            lineNum++;
            fileContent += line + '\n';
            var lineHasDeprecation = checkForDeprecations({
              line: line,
              lineNum: lineNum,
              file: file
            }, function(args){
              fileContent = fileContent.replace(args.suggest.oldSyntax, args.suggest.newSyntax);
            })
            if (lineHasDeprecation) {
              deprecationsFound = true
            }
          })
          .on('end', function () {
            //去除末尾的空格
            writeFS.end(fileContent.substr(0, fileContent.length - 1));
            fs.rename(file + '.bak', file, function (err) {
              if (err) throw err;
            })
            resolve()
          })
      })
    })
    Promise.all(fileChecks)
      .then(function () {
        printSummary(deprecationsFound)
      })
      .catch(function (error) {
        throw error
      })
  })
})

