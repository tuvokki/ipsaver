
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/userlist", {native_parser:true});

var app = express();

// all environments
app.set('port', process.env.PORT || 8124);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico'))); 
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/iplist', routes.iplist(db, 10));
app.get('/iplistp', routes.iplistp(db));
app.post('/deleteallips', routes.deleteallips(db));
app.post('/ipsave', routes.ipsave(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
