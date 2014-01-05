
var moment = require('moment')

function formatRecentTime(time) {
  return moment(time).fromNow()
}

/*
 * Show the time as "2 hours ago" etc using moment.js
 */
var RecentTime = module.exports = React.createClass({
  render: function () {
    return React.DOM.time({
      title: new Date(this.props.time) + '',
      dateTime: this.props.time,
      className: this.props.className + ' recent-time'
    }, formatRecentTime(this.props.time))
  }
})

