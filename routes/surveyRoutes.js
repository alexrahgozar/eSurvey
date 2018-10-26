var mongoose = require("mongoose");
// make sure user is logged in, and has credits
var requireLogin = require("./../middlewares/requireLogin");
var requireCredits = require("./../middlewares/requireCredits");

var Survey = mongoose.model("surveys");
module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    var { title, subject, body, recipients } = req.body;

    var survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
