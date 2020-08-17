//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Lodash Stuff
// Load the full build.
const _ = require('lodash');

// Load the FP build for immutable auto-curried iteratee-first data-last methods.
const fp = require('lodash/fp');
 
// Load method categories.
const array = require('lodash/array');
const object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
const at = require('lodash/at');
const curryN = require('lodash/fp/curryN');

const port = 3001;
const entries = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    homeContent: homeStartingContent,
    entries: entries,
    lod: _
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent 
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.title,
    postBody: req.body.msg
  }

  entries.push(post);


  // Go back to home page after caching the new entry
  res.redirect("/");
});

app.get("/posts/:postTitle", (req, res) => {
  const postTitle = _.lowerCase(req.params.postTitle);

  let title = "Error";
  let content = "No post of this title currently exists on this blog!";

  for (entry of entries) {
    const entryTitle = _.lowerCase(entry.title);
    if (entryTitle === postTitle) {
      // res.render("post", {
      //   title: entry.title,
      //   content: entry.postBody,
      // })
      title = entry.title;
      content = entry.postBody;
    }
  }

  res.render("post", {
    title: title,
    content: content    
  });

  // res.render("post", {
  //   title: "Error",
  //   content: "No post of this title currently exists on this blog!"
  // });
})

app.listen(port, () => console.log("Server started on port", port));
