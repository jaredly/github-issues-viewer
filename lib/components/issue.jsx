/** @jsx React.DOM */

var Labels = require('./labels')
  , utils = require('../utils')

/**
 * An Issue in the list of Issues
 *
 * Child components:
 * - Labels
 */
module.exports = React.createClass({
  displayName: 'Issue',
  onClick: function () {
    window.location = this.props.href;
  },
  render: function () {
    var issue = this.props.model
    return (
      <div className="issue" onClick={this.onClick}>
        <div className="issue__left">
          <a className="issue__header" href={this.props.href}>
            <span className="issue__id">{issue.number}</span>
            <span className="issue__title">{issue.title}</span>
          </a>
          <div className="issue__body">
            {utils.teaserProcessed(issue.body)}
          </div>
        </div>
        <div className="issue__right">
          <a className="issue__user" href={issue.user.html_url}>
            <img className="user__avatar" src={issue.user.avatar_url}/>
            <span className="user__login user__login--avatar-right">{issue.user.login}</span>
          </a>
          <Labels className="issue__labels labels--vertical" labels={issue.labels}/>
        </div>
      </div>
    )
          /*<RecentTime className="comment__time" time={comment.created_at}/>*/
  }
})
