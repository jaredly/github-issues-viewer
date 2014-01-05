/** @jsx React.DOM */
var RecentTime = require('./recent-time')
  , utils = require('../utils')

var Comment = module.exports = React.createClass({
  displayName: 'Comment',
  getDefaultProps: function () {
    model: {}
  },
  render: function () {
    var comment = this.props.model
      , commenter = comment.user
    return (
      React.DOM.div( {className:"comment"}, 
        React.DOM.header( {className:"comment__header"}, 
          React.DOM.a( {className:"comment__commenter", href:commenter.html_url}, 
            React.DOM.img( {className:"user__avatar",
                src:commenter.avatar_url}),
            React.DOM.span( {className:"user__login user__login--avatar-left"}, commenter.login)
          ),
          RecentTime( {className:"comment__time", time:comment.created_at}),
          React.DOM.a( {'data-id':comment.id, className:"comment__id", href:comment.html_url})
        ),
        React.DOM.div( {className:"comment__body"}, 
          utils.processBody(comment.body)
        )
      )
    )
  }
})

