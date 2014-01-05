var d = React.DOM
  , Issue = require('../components/issue')
  , Pager = require('../components/pager')

/*
 * Display all the issues, with paging.
 *
 * Child components:
 * - Pager
 * - list of 'Issue's
 */
module.exports = React.createClass({
  displayName: 'AllIssues',
  getDefaultProps: function () {
    return {
      start: 0,
      issues: [],
      issueHref: function () {},
      onPage: function () {
        console.error('parent component must manage page state')
      }
    }
  },
  render: function () {
    var props = {className: 'page all-issues-page'}
    /*
    if (this.props.start >= this.props.issues.length) {
      return d.div(props, 'No issues here')
    }
    */
    var issues = this.props.issues.slice(this.props.start, this.props.start + 25)
      , message = false
    if (!issues.length) {
      message = d.h4({className:'no-issues'}, this.props.loading ? 'Loading...' : 'No Issues')
    }
    return d.div(
      props,
      Pager({
        step: 25,
        at: this.props.start,
        max: this.props.issues.length,
        onPage: this.props.onPage
      }),
      message,
      d.ul(
        {
          className: 'issue-list'
        },
        issues.map(function (issue) {
          return d.li({className: 'issue-list__item'}, Issue({
            href: this.props.issueHref(issue.id),
            model: issue,
            key: issue.id
          }))
        }.bind(this))
      ),
      Pager({
        step: 25,
        at: this.props.start,
        max: this.props.issues.length,
        onPage: this.props.onPage
      })
    )
  }
})

