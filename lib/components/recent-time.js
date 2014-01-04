
var moment = require('moment')

function formatRecentTime(time) {
  /*
  var date = new Date(time)
    , now = new Date()
  // if it was more than a week ago, just display utc time
  if (now.getTime() - date.getTime() > 1000 * 60 * 60 * 24 * 7) {
    return date.toDateString()
  }
  */
  return moment(time).fromNow()
}

var RecentTime = module.exports = React.createClass({
  render: function () {
    return React.DOM.time({
      title: new Date(this.props.time) + '',
      dateTime: this.props.time,
      className: this.props.className + ' recent-time'
    }, formatRecentTime(this.props.time))
  }
})

