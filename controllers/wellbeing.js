const WellbeingLink = require("../models/wellbeing");

const newWellbeingLink = (req, res, next) => {
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
    WellbeingLink.findOne(
      { WellbeingLinktext: req.body.WellbeingLinktext },
      (err, data) => {
        if (!data) {
          const newWellbeingLink = new WellbeingLink({
            WellbeingLinktext: req.body.WellbeingLinktext,
            WellbeingLink: req.body.WellbeingLink,
            ImageURL: req.body.ImageURL,
            alt: req.body.alt,
          });
          newWellbeingLink.save((err, data) => {
            if (err) {
              return res.json({ Error: err });
            }
            return res.json(data);
          });
        } else {
          if (err) {
            return res.json("Somthing went wrong, please try again. " + err);
          }
          return res.json({ message: "This WellbeingLink already exists" });
        }
      }
    );
  } else {
    return res.json({ message: "Not Authenticated" });
  }
};

const deleteOneWellbeingLinks = (req, res, next) => {
  let WellbeingLinktext = req.params.WellbeingLinktext;
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
    WellbeingLink.deleteOne(
      { WellbeingLinktext: WellbeingLinktext },
      (err, data) => {
        if (data.deletedCount == 0) {
          return res.json({
            message: `WellbeingLink doesn't exist. Tried to delete: ${WellbeingLinktext}`,
          });
        } else if (err) {
          return res.json("Something went wrong, please try again. " + err);
        } else {
          return res.json({ message: "WellbeingLink deleted." });
        }
      }
    );
  } else {
    return res.json({ message: "Not Authenticated" });
  }
};

const deleteAllWellbeingLinks = (req, res, next) => {
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
    WellbeingLink.deleteMany({}, (err) => {
      if (err) {
        return res.json({ message: "Complete delete failed" });
      }
      return res.json({ message: "Complete delete successful" });
    });
  } else {
    return res.json({ message: "Not Authenticated" });
  }
};

const getAllWellbeingLinks = (req, res, next) => {
  WellbeingLink.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};

module.exports = {
  newWellbeingLink,
  deleteAllWellbeingLinks,
  deleteOneWellbeingLinks,
  getAllWellbeingLinks,
};
