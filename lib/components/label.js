
var d = React.DOM

/* A single label */
var Label = module.exports = React.createClass({
  render: function () {
    var label = this.props.model
    return d.a({
      className: 'label',
      href: label.url,
      style: {
        backgroundColor: '#' + label.color,
      }
    }, label.name)
  }
})
