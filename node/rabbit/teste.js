var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:3000/add',
  headers: 
   { 'postman-token': 'b907ca11-4df4-b081-50fd-bab6781a65a5',
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: { a: 'hederrrrrrrrrrrrrr' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});