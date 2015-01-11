###*
IndexController. Responsible for the index view.
###
app.controller "IndexController", ($scope, IpData) ->
  $scope.whatsMyName = "The list"

  IpData.getIpList()
    .then (data) ->
      console.log "data", data
      $scope.iplist = data

  $scope.submitIp = ->
    newrecord = date: Date.now(), msg: $scope.message, host: 'frontend', ip: $scope.myip
    IpData.saveIp(newrecord)
      .then (response) ->
        console.log response
        $scope.iplist.unshift newrecord
