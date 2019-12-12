'use strict'

var chalk = require('chalk')

module.exports = {
  pattern: /\{\{\s*(?:(?!\}\}).)+?\|[^\|]\s*((\w+)\s+((?:(?!\}\})(?!\(.+?\))(?!\|).)+))\s*(?:(?!\}\}).)+?\}\}/,
  warning: function (match, filter, filterName, filterArgs) {

    const oldSyntax = chalk.red(filter.trim());
    const newSyntax = chalk.green(
      filterName + '(' +
        filterArgs.trim().split(/\s+/).join(', ') +
      ')'
    )

    return {
      reason: 'Filters with arguments must now use the same syntax as JavaScript functions',
      fix: (
        'Replace ' + chalk.red(filter.trim()) + ' with ' + newSyntax
      ),
      docsHash: 'Filter-Argument-Syntax',
      type: 'template',
      suggest: {
        replace: true,
        oldSyntax: oldSyntax,
        newSyntax: newSyntax
      }
    }
  }
}
