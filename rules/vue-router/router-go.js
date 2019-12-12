'use strict'

var chalk = require('chalk')

module.exports = {
  pattern: /\b(router\s*\.\s*)go\s*\(\s*['"`\{]/,
  warning: function (match, routerDot) {
    const oldSyntax = chalk.red(routerDot + 'go');
    const newSyntax = chalk.green(routerDot + 'push')
    return {
      reason: 'For consistency with the HTML5 History API, router.go is now only used for back/forward navigation, while router.push is used to navigate to a specific page',
      fix: (
        'Replace ' + oldSyntax + ' with ' + newSyntax
        
      ),
      docsHash: 'router-go',
      type: 'js',
      suggest: {
        replace: true,
        oldSyntax: oldSyntax,
        newSyntax: newSyntax
      }
    }
  }
}
