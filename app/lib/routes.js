// Object that contains all before hooks
var IR_BeforeHooks = {
    isLoggedIn: function(pause) {
      var currentUser = Meteor.userId();
      if(currentUser){
        // Go on
        this.next();
      } else {
        // Either render the template to render (this will preserve the current url)
        this.render("Home");
        // Or redirect to the route/state to go to
        // Router.go('home');
      }
    },
    // somethingForAnyRoute: function() { ... },
    // ...
    // add more before hooks here
}
// (Global) Before hooks for any route
// Router.onBeforeAction(IR_BeforeHooks.somethingForAnyRoute);

// Before hooks for specific routes
// Must be equal to the route names of the Iron Router route map
// Router.before(IR_BeforeHooks.isLoggedIn, {only: ['createHit', 'editHit']});

Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/iphits/create', {
  name: 'createHit',
  controller: 'IphitsController',
  action: 'create',
  where: 'client'
});

Router.route('/iphits/list', {
  name: 'listHits',
  controller: 'IphitsController',
  action: 'list',
  where: 'client'
});

Router.route('/iphits/:_id', {
  name: 'editHit',
  controller: 'IphitsController',
  action: 'edit',
  where: 'client'
});