const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  Linktext: { type: String, required: true },
  Link: { type: String, required: true },
  ImageURL: String,
  alt: String,
});

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;
