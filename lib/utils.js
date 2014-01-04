
var marked = require('marked')

module.exports = {
  linkProfiles: linkProfiles
}

function linkProfiles(text) {
  return React.DOM.span({dangerouslySetInnerHTML: {__html: marked(text)}})
}

