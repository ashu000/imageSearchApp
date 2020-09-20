require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const fs = require("fs");

const searchImage = require("./utils/imageSearch");
require("./utils/imageUpload");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Image Search App",
    name: "Ashutosh Dubey",
  });
});

// Search Api
app.get("/search", (req, res) => {
  if (!req.query.keyword) {
    return res.send({
      error: "You must provide an keyword!",
    });
  }
  searchImage(req.query.keyword, (err, data) => {
    if (err) {
      res.send({ err });
    }
    download(
      data.results[0].urls.raw,
      path.join(__dirname, "image.jpg"),
      function () {
        console.log("done");
      }
    );
    res.send(data);
  });
});

const download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ashutosh Dubey",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
