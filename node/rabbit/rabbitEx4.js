var appRabbiter = function(app) {
	var amqp = require('amqp');
	var connection = null;
	
  var publish = function(queue_name, msg) {
    var encoded_payload = JSON.stringify(msg);
	var e = connection.exchange();
	var q = connection.queue(queue_name, {});
	e.publish(queue_name, msg);
  }
	
  var start = function() {
	  connection = amqp.createConnection({ host: "hmg02-abacos-rabbitmq01.netshoes.local", port: 15672, username: "abacos", password: "abacos", vhost: "abacos" });	  
	  connection.addListener('ready', publish);
  }

  return {
		start : start,
		publish: publish
  }
}
module.exports = appRabbiter;