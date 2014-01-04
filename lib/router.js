var Backbone = require('backbone');

module.exports = Backbone.Router.extend({
  routes: {
    "": "allIssues",
    ":start": "allIssues",
    "issue/:number": "issue"
  }
});

