var sendgrid = require("sendgrid");
var helper = sendgrid.mail;
var keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, htmlTemplate) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email("no-reply@eSurvey.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", htmlTemplate);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    var trackingSettings = new helper.TrackingSettings();
    var clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    var personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    var request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    var response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
