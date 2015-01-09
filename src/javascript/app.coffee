# This is the ip app
app = angular.module 'ipSaver',
  ['ngRoute']

app.config [
  '$routeProvider',
  ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'partials/index.html'
        controller: 'IndexController'
      .otherwise
        templateUrl: 'partials/notthere.html'
        controller: 'NotThereController'
      return
  ]
