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

app.directive("ipList", function() {
  return {
    template: '<div ng-repeat="iprecord in iplist"> <div class="clear grid2">{{ iprecord.ip }}</div> <div class="grid5">{{ iprecord.msg }}</div> <div class="grid3">{{ iprecord.host }}</div> <div class="grid2">{{ iprecord.date }}</div> </div>'
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

app.factory('IpData', function($http, $q) {
  //return a reference to the the IpData function
  return{
    getIpList: function() {
      var ipList;
      ipList = $http.get('/iplist');

      // When our $http promise resolves
      return ipList.then(function(response) {
          if (typeof response.data === 'object') {
            var ipList = response.data;
            return ipList;
          } else {
            // invalid response
            return $q.reject(response.data);
          }
        }, function(response) {
          // something went wrong
          return $q.reject(response.data);
      });
    }
  };
});



/**
IndexController. Responsible for the index view.
 */
app.controller("IndexController", function($scope, IpData) {
  $scope.whatsMyName = "The list";
  return IpData.getIpList().then(function(data) {
    console.log("data", data);
    return $scope.iplist = data;
  });
});


/**
NotThereController. Responsible for the 404 view.
 */
app.controller("NotThereController", function($scope, $location) {
  $scope.whatsMyName = "Error not found";
  $scope.message = "Sorry, the page you are looking for is not here." + $location.path();
  $scope.errorcode = 404;
});
