/** @jsx React.DOM */
var Comments = require('../components/comments')
  , Labels = require('../components/labels')
  , RecentTime = require('../components/recent-time')
  , linkProfiles = require('../utils').linkProfiles

var Issue = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      issue: null
    }
  },
  render: function () {
    var issue = this.props.issue
      , user = issue.user

    return (
      React.DOM.div( {className:"page issue-page"}, 
        React.DOM.header( {className:"issue-page__header"}, 
          React.DOM.h4( {className:"issue-header__main"}, 
            React.DOM.a( {className:"issue-page__back", href:this.props.backLink}, "Back"),
            React.DOM.span( {className:"issue-page__header__title"}, '#' + issue.number + ' ' + issue.title),
            React.DOM.span( {className:"issue-page__state issue-state issue-state--" + issue.state}, 
              issue.state/* TODO capitalize? */
            )
          ),
          React.DOM.div( {className:"issue-header__sub"}, 
            Labels( {className:"issue-header__labels", labels:issue.labels}),
            React.DOM.a( {className:"issue-page__user", href:user.html_url}, 
              React.DOM.img( {className:"user__avatar",
                  src:user.avatar_url}),
              React.DOM.span( {className:"user__login"}, user.login)
            ),
            RecentTime( {className:"issue__time", time:issue.created_at})
          )
        ),
        React.DOM.section( {className:"issue-page__body"}, 
          linkProfiles(issue.body)
        ),
        Comments( {url:issue.comments_url, count:issue.comments})
      )
    )
  }
})
