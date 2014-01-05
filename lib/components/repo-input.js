
var d = React.DOM

/**
 * An input box + load button.
 * Validates the input.
 * Used by ../view.js
 */
var RepoInput = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      initialValue: 'jaredly/github-issues',
      onChange: function () {}
    }
  },
  getInitialState: function () {
    return {
      value: ''
    }
  },
  onChange: function (e) {
    var value = e.target.value
    if (value === this.props.initialValue) value = ''
    this.setState({value: value})
  },
  onKeyDown: function (e) {
    // on return
    if (e.keyCode === 13) {
      if (this.canSubmit()) {
        e.preventDefault()
        e.stopPropagation()
        this.submit()
      }
    }
  },
  submit: function () {
    this.props.onChange(this.state.value)
    this.setState({value: ''})
  },
  canSubmit: function () {
    if (this.state.value.trim() === this.props.initialValue.trim()) {
      return false
    }
    var parts = this.state.value.trim().split('/')
    if (parts.length !== 2) return false
    if (parts[0].length === 0 || parts[1].length === 0) {
      return false
    }
    return true
  },
  render: function () {
    var disabled = !this.canSubmit()
    return d.div(
      {className: 'repo-input'},
      this.props.title ? d.span({className: 'repo-input__title'}, this.props.title) : false,
      d.input({
        placeholder: 'owner/repo',
        onKeyDown: this.onKeyDown,
        value: this.state.value || this.props.initialValue,
        onChange: this.onChange
      }),
      d.button({
        disabled: disabled,
        onClick: disabled ? null : this.submit
      }, 'load')
    )
  }
})

