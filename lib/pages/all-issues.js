var d = React.DOM
  , Issue = require('../components/issue')
  , Pager = require('../components/pager')

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      start: 0,
      issues: [],
      onSelectIssue: function () {},
      onPage: function () {
        console.error('parent component must manage page state')
      }
    }
  },
  render: function () {
    var props = {className: 'page all-issues-page'}
    if (this.props.start >= this.props.issues.length) {
      return d.div(props, 'No issues here')
    }
    var issues = this.props.issues.slice(this.props.start, this.props.start + 25)
    return d.div(
      props,
      Pager({
        at: this.props.start,
        max: this.props.issues.length,
        step: 25,
        onPage: this.props.onPage
      }),
      d.ul(
        {
          className: 'issue-list'
        },
        issues.map(function (issue) {
          return d.li({className: 'issue-list--item'}, Issue({
            onSelect: this.props.onSelectIssue.bind(null, issue.id),
            model: issue,
            key: issue.id
          }))
        }.bind(this))
      )
    )
  }
})

