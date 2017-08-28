"use strict";

// A FEW MODULES

let HyperbolicTimeChamber = "./Factory";
var curry = require("lodash/curry");
var _ = require("lodash");

let fs = require("fs"),
  fetch = require("node-fetch"),
  colors = require("colors"),
  express = require("express"),
  bodyParser = require("body-parser"),
  https = require("https"),
  http = require("http"),
  request = require("request"),
  querystring = require("querystring"),
  cookieParser = require("cookie-parser"),
  Client = require("node-rest-client").Client,
  app = express(),
  client = new Client();

app.set("port", process.env.PORT || 7000);

app.use(express.static("static")).use(cookieParser());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(app.get("port"), function() {
  console.log("\n");
  console.log("********************************************".black.bgWhite);
  console.log("The frontend server is running on port 7000!".black.bgWhite);
  console.log("********************************************".black.bgWhite);
  console.log("\n");
});

app.post("/healthcare", function(req, res) {
  console.log(
    "START *** HEALTHCARE - INCOMING GET REQUEST - HEALTHCARE *** START".black
      .bgCyan
  );

  console.log(req.body);

  let post_data = req.body;
  const base_url = "https://apistage.gohealthuc.com";
  const port = "1981";
  const path = "/v1/eligibility_demo/";

  let post_options = {
    url: base_url + ":" + port + path,
    method: "POST",
    body: JSON.stringify(post_data),
    rejectUnauthorized: false,
    headers: {
      authtoken: "ghbrendan8380"
    }
  };

  request(post_options, (error, response, body) => {
    if (error) {
      res.json(response);
      console.log(error);
    } else {
      res.json(response);
      // console.log(body);
    }
  });
});
