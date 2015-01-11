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
    template: '<div class="wrap head"> <div class="col1of4"> <span>Ip:<br></span> </div> <div class="col1of4"> <span>Comment:<br></span> </div> <div class="col1of4"> <span>Host:<br></span> </div> <div class="col1of4"> <span>Date:<br></span> </div> </div> <div class="wrap"> <hr class="col4of4"> </div> <div class="wrap" ng-repeat="iprecord in iplist"> <div class="col1of4"> {{ iprecord.ip }} </div> <div class="col1of4"> {{ iprecord.msg }} </div> <div class="col1of4"> {{ iprecord.host }} </div> <div class="col1of4"> {{ iprecord.date }} </div> </div>'
  };
});

app.directive("ipForm", function() {
  return {
    template: '<div class="wrap"> <hr> <form id="ipsave" ng-submit="submitIp()"> <div class="col1of4"> <span>Your ip:<br></span> <span class="id">{{ myip }}</span> </div> <div class="col1of4"> <label for="comment">comment:<br> <input ng-model="message" id="comment" type="text" value="" placeholder=" - Type your comment - " name="comment"> </label> <input id="host" type="hidden" value="frontend" name="host"> </div> <div class="col1of4"> <span>Host:<br></span> frontend </div> <div class="col1of4"> <span>Save now:<br></span> <input type="submit" value="save"> </div> </form> </div>'
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
    },
    saveIp: function(newip) {
      return $http.post('/ipsave', newip).
        then(function(response) {
          console.log("response", response);
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
  IpData.getIpList().then(function(data) {
    return $scope.iplist = data;
  });
  return $scope.submitIp = function() {
    var newrecord;
    newrecord = {
      date: Date.now(),
      msg: $scope.message,
      host: 'frontend',
      ip: $scope.myip
    };
    return IpData.saveIp(newrecord).then(function(response) {
      return $scope.iplist.unshift(newrecord);
    });
  };
});


/**
NotThereController. Responsible for the 404 view.
 */
app.controller("NotThereController", function($scope, $location) {
  $scope.whatsMyName = "Error not found";
  $scope.message = "Sorry, the page you are looking for is not here." + $location.path();
  $scope.errorcode = 404;
});
