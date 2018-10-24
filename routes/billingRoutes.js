const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    // user created by passport auto
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};

//
// module.exports = app => {
//   app.post("/api/stripe", (req, res) => {
//     // console.log(req.body);
//     stripe.charges.create({
//       amount: 500,
//       currency: "usd",
//       description: "$5 for 5 credits",
//       source: req.body.id
//     });
//   });
// };
