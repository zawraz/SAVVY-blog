const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
	// console.log(req.url, req.method);

	//lodash

	// const num = _.random(0, 2);
	// console.log(num);

	// const greet = _.once(() => {
	// 	console.log("hello, world!");
	// });

	// greet();
	// greet();

	//set header content type
	res.setHeader("Content-Type", "text/html");

	let path = "./views/";
	switch (req.url) {
		case "/":
			path += "index.html";
			res.statusCode = 200;
			break;
		case "/about":
			path += "about.html";
			res.statusCode = 200;
			break;
		case "/about-us":
			res.setHeader("Location", "/about");
			res.statusCode = 301;
			res.end();
			break;
		default:
			path += "404.html";
			res.statusCode = 404;
			break;
	}

	// send an HTML file
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			res.end();
		} else {
			res.end(data);
		}
	});
});

server.listen(3000, "localhost", () => {
	console.log("listening for requests on port 3000");
});
