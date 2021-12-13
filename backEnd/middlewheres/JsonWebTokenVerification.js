const jwt = require("jsonwebtoken");
require("dotenv").config();
const Agency = require("../models/PhotographyAgency");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  console.log("-" + token + "-");
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, keys) => {
      if (err) {
        res.sendStatus(401);
        console.log("verifyMiddle", err.message);
      } else {
        console.log(keys.id);
        Agency.findById(keys.id, (err, agency) => {
          if (err) {
            res.sendStatus(401);
            console.log("verifyMiddle", err.message);
          } else if (!agency) res.sendStatus(401);
          else {
            console.log("mdwhre: ", keys.id);
            req.Agency = agency; // best thing to do ?
            next();
          }
        });
      }
    });
  } else {
    {
      res.sendStatus(401);
      console.log("verifyMiddle", err.message);
    }
  }
};
module.exports = verify;
