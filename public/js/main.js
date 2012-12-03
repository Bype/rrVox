requirejs.config({
	paths : {
		'socket.io' : '/socket.io/socket.io'
	}
});
require(["jquery", "socket.io"], function($) {
	$(function() {
		$(document).ready(function() {
			require(["world2d"], function(world2d) {
				$(document.createElement("canvas")).attr("id", "canvas").attr("width", $(document).width()-50).attr("height", $(document).height()-50).appendTo($('body'));
				world2d.init();
				var socket = io.connect();
				socket.on('newtxt', function(data) {
					world2d.add(data.txt);
				});
			});
		});
	});
});
