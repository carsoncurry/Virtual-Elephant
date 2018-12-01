require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
<<<<<<< HEAD
var bodyParser = require("body-parser");
var socket = require('socket.io');

=======

var bodyParser = require("body-parser");
var socket = require('socket.io');


>>>>>>> 2181d0c1d1d0f118007b10d79a4174083d580537
var db = require("./models");

var path = require('path');



var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
//body parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//nodemailer idex
app.get("api/friend", function (req, res) {
  res.render("friend");
});
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
<<<<<<< HEAD
  const server = app.listen(PORT, function () {
=======
  app.listen(PORT, function () {
db.sequelize.sync(syncOptions).then(function() {
  const server = app.listen(PORT, function() {

>>>>>>> 2181d0c1d1d0f118007b10d79a4174083d580537
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
  const io = socket(server);
  io.on('connection', function (socket) {
    console.log('made socket connection', socket.id);

    socket.on('chat', function (data) {
      io.sockets.emit('chat', data);
    });


    socket.on('typing', function (data) {
      socket.broadcast.emit('typing', data);
    });

  });
});

module.exports = app;
