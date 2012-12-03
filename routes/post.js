
/*
 * GET users listing.
 */

exports.newTxt = function(req, res){
  console.log(req.body)
  global.io.sockets.emit('newtxt', req.body);
  res.json(req.body);
};