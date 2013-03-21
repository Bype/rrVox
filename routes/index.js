/*
 * GET home page.
 */

exports.index = function(req, res) {
	global.red.lrange('msg', -15, -1, function(err, data) {
		res.render('index', {
			title : 'Vox Populi',
			msg : data
		});
	});
};

