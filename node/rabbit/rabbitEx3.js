	var amqp = require('amqp');

	var connection = amqp.createConnection
	(
		{{ host: "hmg02-abacos-rabbitmq01.netshoes.local", port: 15672, username: "abacos", password: "abacos", vhost: "abacos' }}
	);

	connection.on
	(
		'ready', 
		function()
		{
			var messageToSend = "Hello, MessageQueue!";
			var queueToSendTo = "FaturamentoMarketplace";

			connection.publish
			(
				queueToSendTo, 
				messageToSend
			);

			console.log
			(
				"Sent message: "
				+ messageToSend
			);
		}
	);

