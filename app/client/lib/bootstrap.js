Meteor.startup(function() {
  Meteor.call('headers', function(error, data) {
    Session.set('headers', data);
  });
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});