var express = require("express");
var mongoose = require("mongoose");
var cookieSession = require("cookie-session");
var passport = require("passport");
var bodyParser = require("body-parser");
var keys = require("./../config/keys");
require("./../mongoose-database/index");
require("./../client/src/setupProxy");
var passportConfig = require("./../services/passport");
// var authRoutes = require("./../routes/authRoutes");
// var billingRoutes = require("./../routes/billingRoutes");
mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

var app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
// console.developers.google.com
// authRoutes(app);
// billingRoutes(app)

// const proxy = require("http-proxy-middleware");
//
// module.exports = function(app) {
//   app.use(proxy("/auth/*", { target: "http://localhost:5000" }));
//   app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
//   app.use(proxy("/api/*", { target: "http://localhost:5000" }));
// };

require("./../routes/authRoutes")(app);
require("./../routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // if statements:
  // making sure express will serve production files: main.js, main.css files!
  // console.log("hereeeeeeeee124");
  app.use(express.static("client/build"));

  // making sure express will serve the index.html file if it doesn't
  // recognize the route.
  var path = require("path");
  app.get("*", (req, res) => {
    const index = path.resolve(__dirname, "client", "build", "index.html");
    res.sendFile(index);
  });

  // const path = require("path");
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`hello i am listening at port ${PORT}`);
});
