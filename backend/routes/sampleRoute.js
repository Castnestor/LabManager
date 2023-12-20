const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
    Controllers.sampleController.getSamples(res);
});

router.post("/create", (req, res) => {
    Controllers.sampleController.createSample(req.body, res);
});

router.put("/:id", (req, res) => {
    Controllers.sampleController.updateSample(req, res);
});

router.delete("/:id", (req, res) => {
    Controllers.sampleController.deleteSample(req, res);
});

module.exports = router;