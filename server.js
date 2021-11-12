const express = require("express");
const routes = require("./routes/link");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
};

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(compression());
app.use(allowCrossDomain);

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);

app.use(express.json());

app.use("/", routes);

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
