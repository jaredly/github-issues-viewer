var Backbone = require('backbone')
  , d = React.DOM

  , RepoInput = require('./components/repo-input')
  , View = require('./view')

/*
 * This is the main application component
 *
 * It mostly just gets data from github.
 *
 * Child components:
 * - repo-input (allow you to type in the name of the repo)
 * - view (handle everything else)
 */
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
      lastLoadedPage: 0,
      xhr: null
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
    if (this.state.xhr) {
      this.state.xhr.abort()
    }
    if (!this.state.canLoadMore) {
      return console.error('Got a request to load more, but there was no more')
    }
    var url = 'https://api.github.com/repos/' + this.state.repo + '/issues?page=' + (this.state.lastLoadedPage + 1)
    var xhr = $.get(url, this.gotData, 'json').fail(this.failed)
    this.setState({error:false, loading: true, xhr: xhr})
  },
  gotData: function (data) {
    var canLoadMore = data.length === 30
    this.setState({
      loading: false,
      lastLoadedPage: this.state.lastLoadedPage + 1,
      // XXX: this is brittle...what if they change how many they send?
      canLoadMore: canLoadMore,
      issues: this.state.issues.concat(data),
      error: false,
      xhr: null
    })

    if (canLoadMore) {
      this.load()
    }
  },
  failed: function (xhr, status, reason) {
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
      this.state.error ? d.h3({}, 'Error loading repo: ' + this.state.error) : false,
      View({
        repo: this.state.repo,
        issues: this.state.issues,
        loading: this.state.loading,
        setRepo: this.setRepo
      })
    )
  },
})

