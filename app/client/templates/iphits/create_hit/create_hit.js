/*****************************************************************************/
/* CreateHit: Event Handlers */
/*****************************************************************************/
Template.CreateHit.events({
});

/*****************************************************************************/
/* CreateHit: Helpers */
/*****************************************************************************/
Template.CreateHit.helpers({
  ipdoc: function() {
    var headers = Session.get('headers');
    ip = headers['x-forwarded-for'].split(',')[0];
    return { host: 'new frontend', ip: ip };
  }
});

/*****************************************************************************/
/* CreateHit: Lifecycle Hooks */
/*****************************************************************************/
Template.CreateHit.onCreated(function () {
});

Template.CreateHit.onRendered(function () {
});

Template.CreateHit.onDestroyed(function () {
});
