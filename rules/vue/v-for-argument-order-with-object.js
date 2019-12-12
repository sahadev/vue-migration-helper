'use strict'

var chalk = require('chalk')

module.exports = {
  pattern: /\bv-for="\((key)\s*?,\s*?(\w+)\).+?"/,
  warning: function (match, keyVar, valueVar) {
    const oldSyntax = chalk.red(match);
    const findStr = '(' + keyVar + ', ' + valueVar + ')';
    const replaceStr = '(' + valueVar + ', ' + keyVar + ')';
    const newSyntax = oldSyntax.replace(findStr, replaceStr);
    return {
      reason: 'Argument order for v-for has been updated to match JavaScript conventions',
      fix: (
        'Switch argument order in ' + chalk.red(match) + ' to ' +
        chalk.green('(' + valueVar + ', ' + keyVar + ')')
      ),
      docsHash: 'v-for-Argument-Order-for-Objects',
      type: 'template',
      suggest: {
        replace: true,
        oldSyntax: oldSyntax,
        newSyntax: newSyntax
      }
    }
  }
}
