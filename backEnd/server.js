const express = require("express");
const app = express();
const AuthRoute = require("./routes/Auth");
const AdminPanelRoute = require("./routes/AdminPanel");

require("./configs/Database");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", AuthRoute);
app.use("/api/adminPanel", AdminPanelRoute);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`http://localhost:${port}`);
});
