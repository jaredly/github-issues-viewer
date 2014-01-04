var Backbone = require('backbone')
  , d = React.DOM;

  , AppRouter = require('./router')

  , AllIssuesPage = require('./pages/all-issues')
  , IssuePage = require('./pages/issue')

var App = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      'repo': 'rails/rails'
    }
  },
  getInitialState: function () {
    return {
      page: 'allIssues',
      start: 0,
      issue: false
    }
  },
  allIssues: function (start) {
    var num = start ? parseInt(start) : 0
    if (isNaN(num)) {
      return this.router.navigate("", {trigger: true})
    }
    this.setState({
      page: 'allIssues',
      start: num
    })
  },
  navIssue: function (issue) {
    issue = parseInt(issue)
    if (isNaN(issue)) {
      return this.router.navigate("", {trigger: true})
    }
    this.setState({
      page: 'issue',
      issue: issue
    })
  },
  componentWillMount: function () {
    Backbone.history.start();
    this.router = new AppRouter();
    this.router.on('route:allIssues', this.allIssues)
    this.router.on('route:issue', this.navIssue)
  },
  render: function () {
    var page;
    if (this.state.page === 'issue') {
      page = IssuePage({
        num: this.state.issue,
        repo: this.state.repo
      })
    } else {
      page = AllIssuesPage({
        repo: this.state.repo,
        start: this.state.start
      })
    }
    return d.div({className: 'issue-viewer'}, page)
  }
})
