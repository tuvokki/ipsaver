Meteor.startup(function () {
});

Meteor.methods({
  'headers': function() {
    return headers.get(this);
  }
});