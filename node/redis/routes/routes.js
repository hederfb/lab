var appRouter = function(app) {
	app.get("/account", function(req, res) {
		var accountMock = {
			"username": "nraboy",
			"password": "1234",
			"twitter": "@nraboy"
		}
		
		if(!req.query.username) {
			return res.send({"status": "error", "message": "missing username"});
		} else if(req.query.username != accountMock.username) {
			return res.send({"status": "error", "message": "wrong username"});
		} else {
			return res.send(accountMock);
		}
	});
	
	app.get("/estoque", function(req, res) {
		if(!req.query.username) {
			return res.send({"status": "error", "message": "missing username"});
		} else if(req.query.username != accountMock.username) {
			return res.send({"status": "error", "message": "wrong username"});
		} else {
			return res.send(accountMock);
		}
	});

	app.post("/add", function(req, res) {
		try {
			//app.rabbit.publish("jobs", "jobs", new Buffer(req.body.a));
			//app.rabbit.publish("TESTEEEEEEEEEEE", "welcome to single thread!");
			res.status(200).send("ok");
		} catch (e) {
			res.status(500).send("error " + e.message);
		}
	});

	app.post("/account", function(req, res) {
		if(!req.body.username || !req.body.password || !req.body.twitter) {
			return res.send({"status": "error", "message": "missing a parameter"});
		} else {
			return res.send(req.body);
		}
	});
	
}
module.exports = appRouter;
