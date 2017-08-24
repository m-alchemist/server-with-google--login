const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
mongoose.connect(keys.MONGOURI);

//importing the model for the user
require("./models/user");
//importing the passport file with all the passport wiring up ie strategies and all
require("./services/passport");

//MiddleWare

//allows incoming post/put request body to be accessed in the req.body
app.use(bodyParser.json());
// tells express to make use of cookie session
//key is use to encrypt the cookie

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIEKEY]
  })
);

//tells express to tell passport to serialize user to get a cookie
//then set the cookie in the browser
app.use(passport.initialize());

//tells express to use passport desirialzier
//to get information about the user using just the cookie

app.use(passport.session());

//hooking up express to the routes
//much cleaner code
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV == "production") {
  //express will serve up production assests (main.js and main.css)
  app.use(express.static("client/build"));
  //express will serve up the index.HTML file if route is not recognized

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", index.html));
  });
}
app.listen(PORT);
console.log("listening on " + PORT);
