var appRabbiter = function(app) {
	console.log('amqp');
	var amqp = require('amqplib/callback_api');
    //var connection = amqp.connect({ host: '192.168.99.100', port: 32002, login: 'guest', password: 'guest' });
	//var connection = amqp.connect('amqp://guest:guest@192.168.99.100:32002', function(err, conn) {});
	

	
    var publish = function(queue_name, msg) {
		amqp.connect('amqp://guest:guest@192.168.99.100:32002', function(err, conn) {
		
		if (err !== null) return console.warn(err);
		
		doStuffWithConnection(conn, function() {
			conn.close();
		});
		
		conn.createChannel(function(err, ch) {
			var q = 'hello';

			ch.assertQueue(q, {durable: false});
			ch.sendToQueue(q, new Buffer('Hello World!'));
			ch.close();
			//conn.close();
			console.log(" [x] Sent 'Hello World!'");
		  });
		});
		
  }

  return {
		publish: publish
  }
}
module.exports = appRabbiter;