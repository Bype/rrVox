/*
 * GET users listing.
 */
var fs = require("fs");

var words = [];
fs.readFile('./tools/blacklist.txt', 'utf8', function(err, data) {
	words = data.split(/\ *\n/);
});

exports.newTxt = function(req, res) {

	msgWord = req.body.txt.split(/\ /);
	var passed = msgWord.every(function(w, i) {
		return words.every(function(b, j) {
			return w.toLowerCase() != b.toLowerCase();
		});
	});
	if (passed) {
		req.body.txt = req.body.txt.slice(0, 50);
		global.red.rpush('msg', req.body.txt.slice(0, 50));
		global.io.sockets.emit('newtxt', req.body);
	}
	res.header('Access-Control-Allow-Origin', 'http://admin.bype.org');
	res.json(req.body);
};

exports.delTxt = function(req, res) {
	global.io.sockets.emit('deltxt', {});
	res.header('Access-Control-Allow-Origin', 'http://admin.bype.org');
	res.json({
		sucess : true
	});
};

exports.sms = function(req, res) {
	msgWord = req.query.txt.split(/\ /);
	var passed = msgWord.every(function(w, i) {
		return words.every(function(b, j) {
			return w.toLowerCase() != b.toLowerCase();
		});
	});
	if (passed) {
		req.body.txt = req.query.txt.slice(0, 50);
		global.red.rpush('msg', req.query.txt.slice(0, 50));
		global.io.sockets.emit('newtxt', req.query);
	}

	res.json({
		success : true
	});
};


exports.newSms =  function(req, res){
	if(req.query.text){
	var msg = req.query.text;
	var msgWord = msg.split(/\ /);
        var passed = msgWord.every(function(w, i) {
                return words.every(function(b, j) {
                        return w.toLowerCase() != b.toLowerCase();
                });
        });
        if (passed) {
                req.body.txt = msg;
                global.red.rpush('msg', req.body);
                global.io.sockets.emit('newtxt', req.body);
        }
	}
   res.status(200).end();
};

