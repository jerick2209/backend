require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const strategy = require("./src/config/local");
require("dotenv").config();
const session = require("express-session");

const api = require("./src/routes/api");
const app = express();
const port = process.env.PORT || 8000;
const { mongoConnect } = require("./src/config/db");
app.use(cors());
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "sessionSecret",
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", api);

async function startServer() {
  await mongoConnect();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
