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
      repo: this.props.initialRepo
    }
  },
  setRepo: function (repo) {
    this.setState({repo: repo})
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
        repo: this.state.repo
      })
    )
  },
})

