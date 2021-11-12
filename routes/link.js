const express = require("express");
const router = express.Router();
const linksController = require("../controllers/link");
const multer = require("multer");
const upload = multer();

router.post("/link", upload.none(), linksController.newLink);
router.get("/link", linksController.getAllLinks);
router.delete("/link", linksController.deleteAllLinks);

router.delete("/link/:Linktext", linksController.deleteOneLinks);

module.exports = router; // export to use in server.js
