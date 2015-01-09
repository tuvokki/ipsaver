var app;

app = angular.module('ipSaver', ['ngRoute']);

app.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/index.html',
      controller: 'IndexController'
    }).otherwise({
      templateUrl: 'partials/notthere.html',
      controller: 'NotThereController'
    });
  }
]);


/**
IndexController. Responsible for the index view.
 */
app.controller("IndexController", function($scope) {
  $scope.whatsMyName = "Welcome my son";
});


/**
NotThereController. Responsible for the 404 view.
 */
app.controller("NotThereController", function($scope, $location) {
  $scope.whatsMyName = "Error not found";
  $scope.message = "Sorry, the page you are looking for is not here." + $location.path();
  $scope.errorcode = 404;
});
