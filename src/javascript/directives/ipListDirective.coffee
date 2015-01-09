app.directive "ipList", ->
  template: '<div ng-repeat="iprecord in iplist" class="list">
    <span>{{ iprecord.ip }}</span>
    <span>{{ iprecord.msg }}</span>
    <span>{{ iprecord.host }}</span>
    <span>{{ iprecord.date }}</span>
    </div>'
