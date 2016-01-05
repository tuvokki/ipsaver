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