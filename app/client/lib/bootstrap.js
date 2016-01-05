Meteor.startup(function() {
  Meteor.call('headers', function(error, data) {
    Session.set('headers', data);
  });
});
