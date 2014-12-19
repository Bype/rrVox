requirejs.config({
	paths : {
		'socket.io' : '/socket.io/socket.io'
	}
});
require(["jquery", "socket.io"], function($,io) {
	$(function() {
		$(document).ready(function() {
			require(["world2d"], function(world2d) {
				$(document.createElement("canvas")).attr("id", "canvas").attr("width", $(document).width() - 50).attr("height", $(document).height() - 50).appendTo($('body'));
				world2d.init();
				setTimeout(function() {
					world2d.add("Envoyer un sms au 06 44 63 02 04", true)
				}, 5000);
				var socket = io.connect();
				socket.on('newtxt', function(data) {
					world2d.add(data.txt);
				});
				socket.on('deltxt', function(data) {
					console.log('deltxt')
					location.reload();
				});

				var idx = 0
				function initWith() {
					if (idx < msg.length) {
						world2d.add(msg[idx]);
						idx++;
						setTimeout(initWith, Math.floor(Math.random() * 500) + 500);
					}
				}

				initWith();

			});
		});
	});
});
