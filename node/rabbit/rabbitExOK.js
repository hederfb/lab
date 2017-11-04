var appRabbiter = function(app) {
	var amqp = require('amqplib/callback_api');
	var amqpConn = null;	
	var pubChannel = null;
	var offlinePubQueue = [];
	
	var start = function () {
	  amqp.connect("amqp://guest:guest@192.168.99.100:32002", function(err, conn) {
		if (err) {
		  console.error("[AMQP]", err.message);
		  return setTimeout(start, 1000);
		}
		conn.on("error", function(err) {
		  if (err.message !== "Connection closing") {
			console.error("[AMQP] conn error", err.message);
		  }
		});
		conn.on("close", function() {
		  console.error("[AMQP] reconnecting");
		  return setTimeout(start, 1000);
		});
		console.log("[AMQP] connected");
		amqpConn = conn;
		whenConnected();
	  });
	}	
  
	var whenConnected = function () {
	  startPublisher();
	}
	
	var startPublisher = function () {
	  amqpConn.createConfirmChannel(function(err, ch) {
		ch.on("error", function(err) {
		  console.error("[AMQP] channel error", err.message);
		});
		ch.on("close", function() {
		  console.log("[AMQP] channel closed");
		});

		pubChannel = ch;
		while (true) {
		  var m = offlinePubQueue.shift();
		  if (!m) break;
		  publish(m[0], m[1], m[2]);
		}
	  });
	}

	var publish = function (exchange, routingKey, content) {
	  try {
		pubChannel.publish(exchange, routingKey, content, { persistent: true },
						  function(err, ok) {
							if (err) {
							  console.error("[AMQP] publish", err);
							  offlinePubQueue.push([exchange, routingKey, content]);
							  pubChannel.connection.close();
							}
						  });
	  } catch (e) {
		console.error("[AMQP] publish", e.message);
		offlinePubQueue.push([exchange, routingKey, content]);
		throw e;
	  }
	}	
  
  return {
	  start : start,
	  publish: publish
  }
}
module.exports = appRabbiter;