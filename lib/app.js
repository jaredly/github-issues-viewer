var Backbone = require('backbone')
  , d = React.DOM

  , RepoInput = require('./components/repo-input')
  , View = require('./view')

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      initialRepo: 'rails/rails'
    }
  },
  getInitialState: function () {
    return {
      repo: this.props.initialRepo,
      loading: false,
      error: false,
      issues: [],
      canLoadMore: true,
      lastLoadedPage: 0
    }
  },
  componentWillMount: function () {
    this.load()
  },
  componentDidUpdate: function (oprops, ostate) {
    if (ostate.repo !== this.state.repo) {
      this.load()
    }
  }, 

  setRepo: function (repo) {
    this.setState({
      repo: repo,
      lastLoadedPage: 0,
      canLoadMore: true,
      issues: []
    })
  },

  // data loading
  load: function () {
    if (!this.state.canLoadMore) {
      return console.error('Got a request to load more, but there was no more')
    }
    this.setState({error:false, loading: true})
    var url = 'https://api.github.com/repos/' + this.state.repo + '/issues?page=' + (this.state.lastLoadedPage + 1)
    $.get(url, this.gotData, 'json').fail(this.failed)
  },
  gotData: function (data) {
    var canLoadMore = data.length === 30
    this.setState({
      loading: false,
      lastLoadedPage: this.state.lastLoadedPage + 1,
      // XXX: this is brittle...what if they change how many they send?
      canLoadMore: canLoadMore,
      issues: this.state.issues.concat(data),
      error: false
    })

    if (canLoadMore) {
      this.load()
    }
  },
  failed: function (reason) {
    this.setState({error: reason || true})
  },

  render: function () {
    return d.div(
      {className: 'issue-viewer'},
      RepoInput({
        title: 'View Issues From',
        initialValue: this.state.repo,
        onChange: this.setRepo
      }),
      View({
        repo: this.state.repo,
        issues: this.state.issues,
      })
    )
  },
})

