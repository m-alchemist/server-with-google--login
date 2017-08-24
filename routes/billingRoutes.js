const keys = require("../config/keys");
const stripe = require("stripe")(keys.STRIPESECRETKEY);
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  app.post("/api/payment", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "charged for blah blah blah",
      source: req.body.id
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
