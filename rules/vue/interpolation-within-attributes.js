'use strict'

var chalk = require('chalk')

module.exports = {
  pattern: /\b([\w-:@\.]+)="([^"=]*?)\{\{(.+?)\}\}([^"=]*?)"/,
  warning: function (match, attribute, prefixString, value, suffixString) {

    const oldSyntax = chalk.red(match);
    const newSyntax = 'v-bind:' + attribute + '="' +
      (prefixString.length
        ? '\'' + prefixString.replace('\'', '\\\'') + '\' + '
        : '') +
      value.trim() +
      (suffixString.length
        ? ' + \'' + suffixString.replace('\'', '\\\'') + '\''
        : '') +
      '"'


    return {
      reason: 'Interpolation within attributes has been removed',
      fix: suffixString.indexOf('{{') === -1 && suffixString.indexOf('}}') === -1
        ? (
          'Update ' + oldSyntax + ' to ' +
          chalk.green(newSyntax)
        )
        : (
          'Update ' + oldSyntax + ' to ' +
          'use v-bind with a computed property'
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
