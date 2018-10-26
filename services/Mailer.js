var sendgrid = require("sendgrid");
var helper = sendgrid.mail;
var keys = require("../config/keys");

class Mailer extends helper.Mail {}
