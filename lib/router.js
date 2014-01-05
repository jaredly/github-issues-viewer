var Backbone = require('backbone');

module.exports = Backbone.Router.extend({
  routes: {
    ":owner/:repo": "allIssues",
    ":owner/:repo/:start": "allIssues",
    ":owner/:repo/issue/:number": "issue",
    "*splat": "default"
  }
});

