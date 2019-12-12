'use strict'

var chalk = require('chalk')

module.exports = {
  pattern: /(\w+)\.\$els(\.\w+|\[.+?\])?/,
  warning: function (match, vm, el) {


    const oldSyntax = chalk.red(match);
    const newSyntax = chalk.green(vm + '.$refs' + (el || ''))

    return {
      reason: 'v-el and v-ref merged into ref attribute',
      fix: (
        'Update ' + chalk.red(match) + ' to ' + newSyntax
      ),
      docsHash: 'v-el-and-v-ref',
      type: 'js',
      suggest: {
        replace: true,
        oldSyntax: oldSyntax,
        newSyntax: newSyntax
      }
    }
  }
}
