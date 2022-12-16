const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// connect to MongoDB
const dbURI =
	"mongodb+srv://zawraz:test1234@node-savvy-blog.qcknjpg.mongodb.net/node?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("connected to MongoDB");
		app.listen(3000);
	})
	.catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// app.set('views', 'myViews')

//middleware & static files

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.get("/add-blog", (req, res) => {
// 	const blog = new Blog({
// 		title: "Second Blog",
// 		snippet: "About my second blog",
// 		body: "Content of my second blog",
// 	});

// 	blog.save()
// 		.then((result) => {
// 			res.send(result);
// 		})
// 		.catch((err) => console.log(err));
// });

// app.get("/all-blogs", (req, res) => {
// 	Blog.find()
// 		.then((result) => res.send(result))
// 		.catch((err) => console.log(err));
// });

// app.get("/single-blog", (req, res) => {
// 	Blog.findById()
// 		.then((result) => res.send(result))
// 		.catch((err) => console.log(err));
// });

app.get("/", (req, res) => {
	// res.write("test");
	// res.end();

	// res.send("<p>home page</p>");
	res.redirect("/blogs");
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 case
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
