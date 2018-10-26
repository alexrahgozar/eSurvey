var mongoose = require("mongoose");
var { Schema } = mongoose;

var recipientSchema = new Schema({
  email: String,
  clicked: { type: Boolean, default: false }
});

module.exports = recipientSchema;
