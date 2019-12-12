'use strict'

var chalk = require('chalk')

module.exports = {
  pattern: /\{\{\{\s*?(.+?)\s*?\}\}\}/,
  warning: function (match, interpolationContents) {
    const oldSyntax = chalk.red(match);
    const newSyntax = chalk.green('v-html="' + interpolationContents.trim() + '"') +
      ' on a containing element';
    return {
      reason: 'HTML interpolation with {{{ }}} has been removed',
      fix: (
        'Replace ' + chalk.red(match) + ' with ' + newSyntax
      ),
      docsHash: 'HTML-Interpolation',
      type: 'template',
      suggest: {
        replace: true,
        oldSyntax: oldSyntax,
        newSyntax: newSyntax
      }
    }
  }
}
