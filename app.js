const express = require("express");
const app = express();

// listen for req
app.listen(3000);

app.get("/", (req, res) => {
	// res.write("test");
	// res.end();

	// res.send("<p>home page</p>");

	res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
	// res.send("<p>about page</p>");

	res.sendFile("./views/about.html", { root: __dirname });
});

// redirecting
app.get("/about-us", (req, res) => {
	res.redirect("/about");
});

// 404 case
app.use((req, res) => {
	res.status(404).sendFile("./views/404.html", { root: __dirname });
});
