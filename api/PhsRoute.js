const express = require("express");
const PhsController = require("./PhsController.js")
const router = express.Router();

router.get("/pasiens", PhsController.getphs);
router.get("/pasien/id/:id", PhsController.getphsById);
router.post("/pasien", PhsController.savephs);
router.patch("/pasien/:id", PhsController.updatephs);
router.delete("/pasien/:id", PhsController.deletephs);

module.exports = router;