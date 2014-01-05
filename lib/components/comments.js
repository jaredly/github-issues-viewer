
var Comment = require('./comment')
  , d = React.DOM

/*
 * Loads the comments from github.
 *
 * Child components:
 * - list of 'Comment's
 */
var Comments = module.exports = React.createClass({
  // react api
  getDefaultProps: function () {
    return {
      url: null,
      count: 0
    }
  },
  getInitialState: function () {
    return {
      comments: [],
      loading: false,
      error: false
    }
  },
  componentWillMount: function () {
    if (this.props.url) this.load()
  },
  componentDidUpdate: function (oldprops, oldstate) {
    if (oldprops.url !== this.props.url) this.load()
  },

  // loading data
  load: function () {
    if (this.props.count === 0) {
      this.setState({error: false, comments: []})
      return // no comments to load
    }
    // XXX I don't handle cancelling a request that may still be in
    // progress...
    this.setState({error: false, loading: true, comments: []})
    $.get(this.props.url, this.gotData, 'json').fail(this.fail)
  },
  gotData: function (data) {
    this.setState({comments: data, loading: false, error: false})
  },
  fail: function (reason) {
    console.error('Comment load fail', this.props.url, reason)
    this.setState({error: reason || true, loading: false})
  },

  render: function () {
    if (this.state.error) {
      return d.div({className: 'comments'}, 'Failed to load comments!')
    }
    if (this.state.loading) {
      return d.div({className: 'comments loading'}, 'Loading ' + this.props.count + ' comments...')
    }
    if (!this.state.comments.length) {
      return d.div({className: 'comments'})
    }
    return d.ul(
      {className: 'comments'},
      this.state.comments.map(function (comment) {
        return Comment({
          model: comment,
          key: comment.id
        })
      })
    )
  }
})
