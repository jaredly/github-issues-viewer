
window.$ = require('jquery')
var App = require('./lib/app')

module.exports = function (el) {
  React.renderComponent(App(), el)
}

