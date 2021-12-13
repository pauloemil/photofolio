const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/PhotographyAgency");

require("dotenv").config();

Router.post("/register", (req, res) => {
  let newUser = new User();
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  newUser.agencyName = req.body.password;
  User.create(newUser, (err, user) => {
    if (err) res.json(err);
    else res.json(user);
  });
});
Router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email }, (err, user) => {
    if (err) res.json(err);
    else if (!user) res.sendStatus(401);
    else if (user.password === password) {
      jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "10d" },
        (err, accessToken) => {
          if (err) res.json(err);
          else {
            jwt.sign(
              { id: user._id },
              process.env.ACCESS_TOKEN_KEY,
              { expiresIn: "14d" },
              (err, refreshToken) => {
                if (err) res.json(err);
                else {
                  res.json({
                    user: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                  });
                }
              }
            );
          }
        }
      );
    } else {
      res.sendStatus(401);
    }
  });
});

Router.post("/getAccessToken", (req, res) => {
  res.json("getAccessToken");
});

Router.post("/changePassword", (req, res) => {
  res.json("changePassword");
});

Router.post("/logout", (req, res) => {
  res.json("logout");
});

module.exports = Router;
