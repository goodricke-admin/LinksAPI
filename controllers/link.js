const Link = require("../models/link");

const newLink = (req, res, next) => {
  let authheader = req.headers.authorization;
  if (!authheader) {
    return res.json({ message: "Not Authenticated" });
  }
  var auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auth[0];
  var pass = auth[1];
  if (pass == process.env.AUTHTOKEN) {
    Link.findOne({ Linktext: req.body.Linktext }, (err, data) => {
      if (!data) {
        const newLink = new Link({
          Linktext: req.body.Linktext,
          Link: req.body.Link,
          ImageURL: req.body.ImageURL,
          alt: req.body.alt,
        });
        newLink.save((err, data) => {
          if (err) {
            return res.json({ Error: err });
          }
          return res.json(data);
        });
      } else {
        if (err) {
          return res.json("Somthing went wrong, please try again. " + err);
        }
        return res.json({ message: "This Link already exists" });
      }
    });
  } else {
    return res.json({ message: "Not Authenticated" });
  }
};

const deleteOneLinks = (req, res, next) => {
  let Linktext = req.params.Linktext;
  let authheader = req.headers.authorization;
  if (!authheader) {
    return res.json({ message: "Not Authenticated" });
  }
  var auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auth[0];
  var pass = auth[1];
  if (pass == process.env.AUTHTOKEN) {
    Link.deleteOne({ Linktext: Linktext }, (err, data) => {
      if (data.deletedCount == 0) {
        return res.json({
          message: `Link doesn't exist. Tried to delete: ${Linktext}`,
        });
      } else if (err) {
        return res.json("Something went wrong, please try again. " + err);
      } else {
        return res.json({ message: "Link deleted." });
      }
    });
  } else {
    return res.json({ message: "Not Authenticated" });
  }
};

const deleteAllLinks = (req, res, next) => {
  let authheader = req.headers.authorization;
  if (!authheader) {
    return res.json({ message: "Not Authenticated" });
  }
  var auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auth[0];
  var pass = auth[1];
  if (pass == process.env.AUTHTOKEN) {
    Link.deleteMany({}, (err) => {
      if (err) {
        return res.json({ message: "Complete delete failed" });
      }
      return res.json({ message: "Complete delete successful" });
    });
  } else {
    return res.json({ message: "Not Authenticated" });
  }
};

const getAllLinks = (req, res, next) => {
  Link.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};

module.exports = { newLink, deleteAllLinks, deleteOneLinks, getAllLinks };
