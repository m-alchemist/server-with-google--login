const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");
const Survey = mongoose.model("surveys");
const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });
  app.get("/api/surveys/:id/:choice", (req, res) => {
    res.send("We appreciate your feedback");
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //send email
    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    //chain allows for chaining multiple lodash functions
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const pathname = new URL(url).pathname;
        match = p.test(pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,

            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            //update cricteria
            $inc: { [choice]: 1 },
            $set: {
              "recipients.$.responded": true,
              lastResponded: new Date()
            }
          }
        ).exec();
      })
      .value();
    console.log(events);
    res.send({});
  });
};
