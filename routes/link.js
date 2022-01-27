const express = require("express");
const router = express.Router();
const linksController = require("../controllers/link");
const wellbeingController = require("../controllers/wellbeing");
const multer = require("multer");
const upload = multer();

router.post("/links/link", upload.none(), linksController.newLink);
router.get("/links/link", linksController.getAllLinks);
router.delete("/links/link", linksController.deleteAllLinks);

router.delete("/links/link/:Linktext", linksController.deleteOneLinks);

router.post(
  "/wellbeing/link",
  upload.none(),
  wellbeingController.newWellbeingLink
);
router.get("/wellbeing/link", wellbeingController.getAllWellbeingLinks);
router.delete("/wellbeing/link", wellbeingController.deleteAllWellbeingLinks);

router.delete(
  "/wellbeing/link/:WellbeingLinktext",
  wellbeingController.deleteOneWellbeingLinks
);

module.exports = router; // export to use in server.js
