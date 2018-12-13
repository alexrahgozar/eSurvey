var mongoose = require("mongoose");
var { Schema } = mongoose;

var recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
