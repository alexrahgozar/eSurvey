var _ = require("lodash");
var Path = require("path-parser");
// url is a default in the node.js system
var { URL } = require("url");
var mongoose = require("mongoose");
// make sure user is logged in, and has credits
var requireLogin = require("./../middlewares/requireLogin");
var requireCredits = require("./../middlewares/requireCredits");
var Mailer = require("./../services/Mailer");
var surveyTemplate = require("./../services/emailTemplates/surveyTemplate");
var Survey = mongoose.model("surveys");
module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    var feedbackSurveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(feedbackSurveys);
  });

  app.get(
    "https://stark-earth-90912.herokuapp.com/api/surveys/:surveyId/:choice",
    (req, res) => {
      res.send("Thank You For Voting!");
    }
  );

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thank You For Voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    var pathHelper = new Path("/api/surveys/:surveyId/:choice");
    // es6 event to email and url
    _.chain(req.body)
      .map(({ email, url }) => {
        // taking out the route only and not the domain
        // taking out the id and choice
        // console.log("Iam Testing: ", p.test(pathname));
        var match = pathHelper.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      // compact iterates through array and return any element that is NOT undefined
      // console.log("TESTING EVENTS: ", events);
      .compact()
      //a user can't have the same email on the same survey
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        // lookup and find the data,  then increment
        // $inc is a mongo operator.. to find 'yes'/'no' and increment
        // let choice = "yes" || "no";
        // Survey from mongoose
        // and _id for mongo and .exec stands for execute
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },
          {
            // es6 evaluator basically represents yes or no
            // $ respresents the same inquiry
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    // console.log("UniqEvent: ", uniqueEvent);
    // console.log("NewEventRef: ", myEvents);
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    var { title, subject, body, recipients } = req.body;

    var survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // send an email
    var sendMail = new Mailer(survey, surveyTemplate(survey));

    try {
      await sendMail.send();
      await survey.save();
      req.user.credits -= 1;
      var eSurveyUser = await req.user.save();
      res.send(eSurveyUser);
    } catch (err) {
      // 422 (Unprocessable Entity
      res.status(422).send(err);
    }
  });
};
