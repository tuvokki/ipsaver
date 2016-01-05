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
    return Iphits.find();
  },
  beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete hit: "' + doc.msg + " " + doc.ip + '"?')) {
      this.remove();
      Router.go('listHits');
    }
  };
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
