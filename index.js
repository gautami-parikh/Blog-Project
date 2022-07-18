const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const uri = "mongodb://localhost:27017/my_database";
mongoose
  .connect(uri, { useNewURLParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = new express();
const ejs = require("ejs");
const mongodb = require("mongodb");
app.set("view engine", "ejs"); //tell express to use EJS as our templating engine that the file ending with ejs should be rendered with EJS package.
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//saving posts in database
const BlogPost = require("./models/BlogPost");

const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/index.html'))
  const blogposts = await BlogPost.find({})
  
  res.render("index", {
    blogposts
  }) //we send a view to the user
});

app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/about.html'))
  res.render("about");
});

app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/contact.html'))
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  // res.sendFile(path.resolve(__dirname,'pages/post.html'))
  res.render("post", {
    blogpost
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", async (req, res) => {
  console.log(req);
  let image = req.files.image;
    image.mv(path.resolve(_dirname, 'public/assets/img', image.name), async (error) => {
    const blog = BlogPost.create(req.body);
    blog.save()
    res.redirect('/')
  }
  )
  //mode creates a new doc with browser data
  const blog = new BlogPost(req.body);

  await blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(4000, (req, res) => {
  console.log("App listening on port 4000");
});
