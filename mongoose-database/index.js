// var keys = require("./../config/keys");
// var mongoose = require("mongoose");
// mongoose.connect(
//   keys.mongoURI,
//   { auth: { authdb: "admin" } }
// );
// //localhost:5000/auth/google/callback
//
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("we're connected!");
// });
//
// var GoogleUserSchema = new mongoose.Schema({
//   googleId: String,
//   credits: { type: Number, default: 0 }
// });
//
// mongoose.model("users", GoogleUserSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
