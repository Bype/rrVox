/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/post'), http = require('http'), path = require('path'), io = require('socket.io');
global.red = require("redis").createClient(6379, "dbserver");

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('less-middleware')({
		src : __dirname + '/public'
	}));
	app.use(express.static(path.join(__dirname, 'public')));
	app.set('redisdb', 2);
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), process.env.LISTENADDR || '127.0.0.1', function() {
	console.log("Express server listening on port " + app.get('port'));
});

//Setup Socket.IO
global.io = io.listen(server, {
	log : false
});
// assuming io is the Socket.IO server object
global.io.configure(function() {
	global.io.set("transports", ["xhr-polling"]);
	global.io.set("polling duration", 10);
	global.io.set('log level', 0);
});
global.io.sockets.on('connection', function(socket) {
	socket.on('newtxt', function(data) {
		socket.broadcast.emit('newtxt', data);
	});
	socket.on('disconnect', function() {
	});
});

app.get('/', routes.index);
app.post('/newTxt', user.newTxt);

