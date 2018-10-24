const path = require("path");
var express = require("express");
var mongoose = require("mongoose");
var cookieSession = require("cookie-session");
var passport = require("passport");
var bodyParser = require("body-parser");
var keys = require("./../config/keys");
require("./../mongoose-database/index");
require("./../client/src/setupProxy");
var passportConfig = require("./../services/passport");
var authRoutes = require("./../routes/authRoutes");
var billingRoutes = require("./../routes/billingRoutes");
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

authRoutes(app);
billingRoutes(app);

// require("./../routes/authRoutes")(app);
// require("./../routes/billingRoutes")(app);
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get("*", (req, res) => {
    console.log("okay: ", __dirname);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`hello i am listening at port ${PORT}`);
});
