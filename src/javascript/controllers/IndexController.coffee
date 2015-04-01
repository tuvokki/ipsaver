# Responsible for the index view.
# Depends on [IpDataFactory](IpDataFactory.html)
app.controller "IndexController", ($scope, IpData) ->
  $scope.whatsMyName = "The list"

  # get data from IpData datasource
  IpData.getIpList()
    .then (data) ->
      $scope.iplist = data

  # submit a new ip address into the database
  $scope.submitIp = ->
    newrecord = date: Date.now(), msg: $scope.message, host: 'frontend', ip: $scope.myip
    IpData.saveIp(newrecord)
      .then (response) ->
        $scope.iplist.unshift newrecord
