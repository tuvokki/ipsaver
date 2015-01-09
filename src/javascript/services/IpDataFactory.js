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

