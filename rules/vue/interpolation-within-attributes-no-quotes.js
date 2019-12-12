'use strict'

var chalk = require('chalk')

module.exports = {
  pattern: /\b([\w-:@\.]+)=\{\{(.+?)\}\}/,
  warning: function (match, attribute, value) {

    const oldSyntax = chalk.red(match);
    const newSyntax = 'v-bind:' + attribute + '="' + value.trim() + '"'

    return {
      reason: 'Interpolation within attributes has been removed',
      fix: (
        'Update ' + oldSyntax + ' to ' + chalk.green(newSyntax)
      ),
      docsHash: 'Interpolation-within-Attributes',
      type: 'template',
      suggest: {
        replace: true,
        oldSyntax: oldSyntax,
        newSyntax: newSyntax
      }
    }
  }
}
