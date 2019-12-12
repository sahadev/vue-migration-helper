'use strict'

var chalk = require('chalk')

const hookReplacements = {
  beforeCompile: 'created',
  compiled: 'mounted',
  init: 'beforeCreate',
  attached: 'a custom in-DOM check in another hook -> mounted',
  detached: 'a custom in-DOM check in another hook -> destroyed',
  ready: 'mounted'
}

const extraInfo = {
  ready: ', then use ' + chalk.green('Vue.nextTick') + ' if you need an in-document guarantee'
}

module.exports = {
  pattern: new RegExp(
    '^\\s*(' +
    Object.keys(hookReplacements).join('|') +
    ')\\s*?(?::|\\()'
  ),
  warning: function (match, hook) {
    const replacementHook = hookReplacements[hook] + ''
    const info = extraInfo[hook]

    const oldSyntax = chalk.red(match);
    let appendStr = oldSyntax.split('(').length === 2 ? '(' : ':';

    const newSyntax = replacementHook + ' ' +appendStr;
    return {
      reason: hook + ' lifecycle hook has been removed',
      fix: (
        'Replace ' + chalk.red(hook) + ' with ' +
        (replacementHook.indexOf(' ') === -1
          ? chalk.green(replacementHook)
          : replacementHook) +
        (info || '')
      ),
      docsHash: hook + '',
      type: 'js',
      suggest: {
        replace: false,
        oldSyntax: oldSyntax,
        newSyntax: newSyntax
      }
    }
  }
}
