var Backbone = require('backbone')
  , d = React.DOM

  , AppRouter = require('./router')

  , AllIssuesPage = require('./pages/all-issues')
  , IssuePage = require('./pages/issue')

var View = module.exports = React.createClass({
  // react stuff
  getDefaultProps: function () {
    return {
      repo: 'rails/rails',
      issues: []
    }
  },
  getInitialState: function () {
    return {
      page: 'allIssues',
      start: 0,
      issue: false,
    }
  },
  componentWillMount: function () {
    this.router = new AppRouter();
    this.router.on('route:allIssues', this.allIssues)
    this.router.on('route:issue', this.navIssue)

    Backbone.history.start();
  },
  componentWillReceiveProps: function (props) {
    if (props.repo !== this.props.repo) {
      this.goHome()
    }
  },

  // routing
  allIssues: function (start) {
    var num = start ? parseInt(start) : 0
    if (isNaN(num)) {
      return this.goHome()
    }
    this.setState({
      page: 'allIssues',
      start: num
    })
  },
  navIssue: function (issue) {
    issue = parseInt(issue)
    if (isNaN(issue)) {
      return this.goHome()
    }
    this.setState({
      page: 'issue',
      issue: issue
    })
  },
  goHome: function () {
    this.router.navigate("", {trigger: true})
  },

  // child callbacks
  onPage: function (start) {
    this.router.navigate('' + start, {trigger: true})
  },
  issueHref: function (issue) {
    return '#issue/' + issue
  },

  getMessage: function () {
    if (this.state.error) return 'Failed to fetch issues!'
    if (this.state.loading) return 'loading...'
  },

  getIssue: function (issues) {
    issues = issues || this.props.issues
    for (var i=0; i<issues.length; i++) {
      if (issues[i].id == this.state.issue) {
        return issues[i]
      }
    }
    if (this.props.onLoadMore) {
      setTimeout(function () {
        this.props.onLoadMore()
      }.bind(this), 10)
    }
  },
  render: function () {
    var message = this.getMessage()
      , props = {className: 'main-view'}
      , page;
    if (message) {
      return d.div(props, message)
    }
    if (this.state.page === 'issue') {
      page = IssuePage({
        repo: this.props.repo,
        backLink: '#' + this.state.start,
        issue: this.getIssue()
      })
    } else {
      page = AllIssuesPage({
        repo: this.props.repo,
        start: this.state.start,
        issues: this.props.issues,
        onLoadMore: this.props.onLoadMore,

        issueHref: this.issueHref,
        onPage: this.onPage,
      })
    }
    return d.div(props, page)
  }
})

