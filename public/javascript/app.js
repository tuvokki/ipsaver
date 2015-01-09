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

app.directive('sharedFooter', function() {
  return {
    template: '<a href="/iplist">raw list</a>'
  };
});

app.directive('sharedHeader', function() {
  return {
    template: '<h1>{{whatsMyName}}</h1>'
  };
});

app.directive('myDomDirective', function() {
  return {
    link: function($scope, element, attrs) {
      element.bind('click', function() {
        element.html('You clicked me!');
      });
      element.bind('mouseenter', function() {
        element.css('background-color', 'yellow');
      });
      element.bind('mouseleave', function() {
        element.css('background-color', 'white');
      });
    }
  };
});


/**
IndexController. Responsible for the index view.
 */
app.controller("IndexController", function($scope) {
  $scope.whatsMyName = "The list";
});


/**
NotThereController. Responsible for the 404 view.
 */
app.controller("NotThereController", function($scope, $location) {
  $scope.whatsMyName = "Error not found";
  $scope.message = "Sorry, the page you are looking for is not here." + $location.path();
  $scope.errorcode = 404;
});
