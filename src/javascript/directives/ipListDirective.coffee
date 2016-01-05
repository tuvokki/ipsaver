app.directive "ipList", ->
  template: '
<div class="wrap head">
  <div class="col1of4">
    <span>Ip:</span>
  </div>
  <div class="col1of4">
    <span>Comment:</span>
  </div>
  <div class="col1of4">
    <span>Host:</span>
  </div>
  <div class="col1of4">
    <span>Date:</span>
  </div>
</div>
<div class="wrap data">
  <div ng-repeat="iprecord in iplist" class="record">
    <div class="col1of4">
      {{ iprecord.ip }}
    </div>
    <div class="col1of4">
      {{ iprecord.msg }}
    </div>
    <div class="col1of4">
      {{ iprecord.host }}
    </div>
    <div class="col1of4">
      {{ iprecord.date | date : "MM/dd/yyyy h:mma" }}
    </div>
  </div>
</div>'

app.directive "ipForm", ->
  template: '
<div class="wrap form">
  <form id="ipsave" ng-submit="submitIp()">
    <div class="col1of4">
      <h6>Your ip:</h6>
      <span>{{ myip }}</span>
    </div>
    <div class="col1of4">
      <h6>Comment:</h6>
      <input ng-model="message" id="comment" type="text" value="" placeholder=" - Type your comment - " name="comment">
    </div>
    <div class="col1of4">
      <h6>Host:</h6>
      frontend
      <input id="host" type="hidden" value="frontend" name="host">
    </div>
    <div class="col1of4">
      <h6>Save now:</h6>
      <input type="submit" value="save">
    </div>
  </form>
</div>'
