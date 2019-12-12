'use strict'

var chalk = require('chalk')

module.exports = {
  pattern: /\bv-for="\(([ijk]|in?d?e?x?)\s*?,\s*?(\w+)\).+?"/,
  warning: function (match, indexVar, itemVar) {
    const oldSyntax = chalk.red(match);
    const findStr = '(' + indexVar + ', ' + itemVar + ')';
    const findStr2 = '(' + indexVar + ',' + itemVar + ')';
    const replaceStr = '(' + itemVar + ', ' + indexVar + ')';
    let newSyntax = oldSyntax.replace(findStr, replaceStr);
    newSyntax = newSyntax.replace(findStr2, replaceStr);
    return {
      reason: 'Argument order for v-for has been updated to match JavaScript conventions',
      fix: (
        'Switch argument order in ' + chalk.red(match) + ' to ' +
        chalk.green('(' + itemVar + ', ' + indexVar + ')')
      ),
      docsHash: 'v-for-Argument-Order-for-Arrays',
      type: 'template',
      suggest: {
        replace: true,
        oldSyntax: oldSyntax,
        newSyntax: newSyntax
      }
    }
  }
}
