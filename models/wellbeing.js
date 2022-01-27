const mongoose = require("mongoose");

const WellbeingLinkSchema = new mongoose.Schema({
  WellbeingLinktext: { type: String, required: true },
  WellbeingLink: { type: String, required: true },
  ImageURL: String,
  alt: String,
});

const WellbeingLink = mongoose.model("WellbeingLink", WellbeingLinkSchema);
module.exports = WellbeingLink;
