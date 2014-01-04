
var d = React.DOM
  , Label = require('./label')

var Labels = module.exports = React.createClass({
  render: function () {
    return d.ul({
      className: 'labels ' + this.props.className
    }, this.props.labels.map(function (label) {
      return d.li({className: 'labels__label'}, Label({model: label}))
    }))
  }
})
