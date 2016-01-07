// User profiles are editable by default even if insecure has been removed.
// To prevent this, just add the following deny rule:
Meteor.users.deny({
  update: function() {
    return true;
  }
});