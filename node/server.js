var http = require("http");
var url = require("url");

function start() {
  function onRequest(request, response) {
    //console.log("Request received.");
    query = url.parse(request.url).query;
    console.log(query);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Tweets Received. Thanks!");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
