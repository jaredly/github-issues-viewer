var Backbone = require('backbone')
  , d = React.DOM

  , AppRouter = require('./router')

  , AllIssuesPage = require('./pages/all-issues')
  , IssuePage = require('./pages/issue')

var View = module.exports = React.createClass({
  // react stuff
  getDefaultProps: function () {
    return {
      repo: 'rails/rails'
    }
  },
  getInitialState: function () {
    return {
      page: 'allIssues',
      start: 0,
      issue: false,
      loading: false,
      error: false,
      issues: []
    }
  },
  componentWillMount: function () {
    this.router = new AppRouter();
    this.router.on('route:allIssues', this.allIssues)
    this.router.on('route:issue', this.navIssue)

    this.load()
    Backbone.history.start();
  },
  componentDidUpdate: function (oprops, ostate) {
    if (oprops.repo !== this.props.repo) {
      this.load()
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

  // data loading
  load: function () {
    this.setState({error:false, loading: true, issues: []})
    var url = 'https://api.github.com/repos/' + this.props.repo + '/issues'
    $.get(url, this.gotData, 'json').fail(this.failed)
  },
  gotData: function (data) {
    this.setState({loading: false, issues: data, error: false})
  },
  failed: function (reason) {
    this.setState({error: reason || true})
  },

  // child callbacks
  onPage: function (start) {
    this.router.navigate('' + start, {trigger: true})
  },
  onSelectIssue: function (issue) {
    this.router.navigate('issue/' + issue, {trigger: true})
  },

  getMessage: function () {
    if (this.state.error) return 'Failed to fetch issues!'
    if (this.state.loading) return 'loading...'
  },
  getIssue: function () {
    for (var i=0; i<this.state.issues.length; i++) {
      if (this.state.issues[i].id == this.state.issue) {
        return this.state.issues[i]
      }
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
        issues: this.state.issues,

        onSelectIssue: this.onSelectIssue,
        onPage: this.onPage,
      })
    }
    return d.div(props, page)
  }
})

