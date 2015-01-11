app.directive "ipList", ->
  template: '
<div class="wrap head">
  <div class="col1of4">
    <span>Ip:<br></span>
  </div>
  <div class="col1of4">
    <span>Comment:<br></span>
  </div>
  <div class="col1of4">
    <span>Host:<br></span>
  </div>
  <div class="col1of4">
    <span>Date:<br></span>
  </div>
</div>
<div class="wrap">
  <hr class="col4of4">
</div>  
<div class="wrap" ng-repeat="iprecord in iplist">
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
    {{ iprecord.date }}
  </div>
</div>'

app.directive "ipForm", ->
  template: '
<div class="wrap">
  <hr>
  <form id="ipsave" ng-submit="submitIp()">
    <div class="col1of4">
      <span>Your ip:<br></span>
      <span class="id">{{ myip }}</span>
    </div>
    <div class="col1of4">
        <label for="comment">comment:<br>
          <input ng-model="message" id="comment" type="text" value="" placeholder=" - Type your comment - " name="comment">
        </label>
        <input id="host" type="hidden" value="frontend" name="host">
    </div>
    <div class="col1of4">
      <span>Host:<br></span>
      frontend
    </div>
    <div class="col1of4">
      <span>Save now:<br></span>
      <input type="submit" value="save">
    </div>
  </form>
</div>'
