/** @jsx React.DOM */

var Labels = require('./labels')
  , utils = require('../utils')

module.exports = React.createClass({
  displayName: 'Issue',
  onClick: function () {
    window.location = this.props.href;
  },
  render: function () {
    var issue = this.props.model
    return (
      React.DOM.div( {className:"issue", onClick:this.onClick}, 
        React.DOM.div( {className:"issue__left"}, 
          React.DOM.a( {className:"issue__header", href:this.props.href}, 
            React.DOM.span( {className:"issue__id"}, issue.number),
            React.DOM.span( {className:"issue__title"}, issue.title)
          ),
          React.DOM.div( {className:"issue__body"}, 
            utils.teaserProcessed(issue.body)
          )
        ),
        React.DOM.div( {className:"issue__right"}, 
          React.DOM.a( {className:"issue__user", href:issue.user.html_url}, 
            React.DOM.img( {className:"user__avatar", src:issue.user.avatar_url}),
            React.DOM.span( {className:"user__login user__login--avatar-right"}, issue.user.login)
          ),
          Labels( {className:"issue__labels labels--vertical", labels:issue.labels})
        )
      )
    )
          /*<RecentTime className="comment__time" time={comment.created_at}/>*/
  }
})
