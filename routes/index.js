/*
 * GET home page.
 */

exports.index = function(req, res) {
	global.red.lrange('msg', -50, -1, function(err, data) {
		res.render('index', {
			title : 'Vox Populi',
			msg : data
		});
	});
};

exports.admin = function(req, res) {
	global.red.lrange('msg', -100, -1, function(err, data) {
		data.reverse();
		res.render('admin', {
			title : 'Vox Populi',
			msg : data
		});
	});
};

exports.del = function(req, res) {
	global.red.lrem('msg', 1, req.query.msg, function(err, data) {
		res.redirect('/admin');
	});
}