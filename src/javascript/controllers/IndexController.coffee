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
    console.log "submitting data ... ", $scope.message, $scope.myip
