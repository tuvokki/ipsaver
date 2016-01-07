/*****************************************************************************/
/* ListHits: Event Handlers */
/*****************************************************************************/
Template.ListHits.events({
});

/*****************************************************************************/
/* ListHits: Helpers */
/*****************************************************************************/
Template.ListHits.helpers({
  hits: function() {
    return Iphits.find({}, {
      limit: 10,
      sort: { date: -1}
    });
  },
  beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete hit: "' + doc.msg + " " + doc.ip + '"?')) {
      this.remove();
      Router.go('listHits');
    }
  };
 },
 crudEnabled: function () {
  if (Meteor.user().username == 'admin')
    return true;
  return this.owner == Meteor.userId();
 }
});

/*****************************************************************************/
/* ListHits: Lifecycle Hooks */
/*****************************************************************************/
Template.ListHits.onCreated(function () {
});

Template.ListHits.onRendered(function () {
});

Template.ListHits.onDestroyed(function () {
});
