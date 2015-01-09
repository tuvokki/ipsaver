app.directive "ipList", ->
  template: '<div ng-repeat="iprecord in iplist">
      <div class="clear grid2">{{ iprecord.ip }}</div>
      <div class="grid5">{{ iprecord.msg }}</div>
      <div class="grid3">{{ iprecord.host }}</div>
      <div class="grid2">{{ iprecord.date }}</div>
    </div>'
