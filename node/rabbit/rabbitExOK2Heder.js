var appRabbiter = function(app) {
	var amqp = require('amqplib/callback_api');
	var amqpConn = null;	
	//var pubChannel = null;
	
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
	  });
	}	
	
	var startPublisher = function (callback) {
	  amqpConn.createConfirmChannel(function(err, ch) {
		ch.on("error", function(err) {
		  console.error("[AMQP] channel error", err.message);
		});
		ch.on("close", function() {
		  //console.log("[AMQP] channel closed");
		});

		callback(ch);
	  });
	}

	var publish = function (exchange, routingKey, content) {
		var callback = function(pubChannel) {
			try {
				pubChannel.publish(exchange, routingKey, content, { persistent: true },
								  function(err, ok) {
									  pubChannel.close();
								 });
			  } catch (e) {
				console.error("[AMQP] publish", e.message);
				pubChannel.close();
				throw e;
			  }
		}
	  startPublisher(callback);
	  
	}	
  
  return {
	  start : start,
	  publish: publish
  }
}
module.exports = appRabbiter;