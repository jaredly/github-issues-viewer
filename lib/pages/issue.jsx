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
      <div className="page issue-page">
        <header className="issue-page__header">
          <h4 className="issue-header__main">
            <a className="issue-page__back" href={this.props.backLink}>Back</a>
            <span className="issue-page__header__title">{'#' + issue.number + ' ' + issue.title}</span>
            <span className={"issue-page__state issue-state issue-state--" + issue.state}>
              {issue.state/* TODO capitalize? */}
            </span>
          </h4>
          <div className="issue-header__sub">
            <Labels className="issue-header__labels" labels={issue.labels}/>
            <a className="issue-page__user" href={user.html_url}>
              <img className="user__avatar"
                  src={user.avatar_url}/>
              <span className="user__login">{user.login}</span>
            </a>
            <RecentTime className="issue__time" time={issue.created_at}/>
          </div>
        </header>
        <section className="issue-page__body">
          {linkProfiles(issue.body)}
        </section>
        <Comments url={issue.comments_url} count={issue.comments}/>
      </div>
    )
  }
})
