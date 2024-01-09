const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
    Controllers.sampleController.getSamples(res);
});

router.post("/create", (req, res) => {
    Controllers.sampleController.createBulkSample(req.body, res);
});

router.get("/:id", (req, res) => {
    Controllers.sampleController.findSamples(req, res)
})

router.put("/:id", (req, res) => {
    Controllers.sampleController.updateSample(req, res);
});

router.delete("/:id", (req, res) => {
    Controllers.sampleController.deleteSample(req, res);
});

module.exports = router;