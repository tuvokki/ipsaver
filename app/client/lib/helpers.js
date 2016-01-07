AutoForm.hooks({
  editHitForm: {
    // Called when the submit operation fails.
    onError: function(formType, error) {
      FlashMessages.sendError("Error updating hit: " + error);
    }
  }
});