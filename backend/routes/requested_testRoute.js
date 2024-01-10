const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
    Controllers.requested_testController.getRequested_tests(res);
});

router.post("/create", (req, res) => {
    Controllers.requested_testController.createRequested_test(req.body, res)
});

router.get("/:id", (req, res) => {
    Controllers.requested_testController.getTestSample(req, res)
});

router.put("/:id", (req, res) => {
    Controllers.requested_testController.updateRequested_test(req, res);
});

router.delete("/:id", (req, res) => {
    Controllers.requested_testController.deleteRequested_test(req, res);
})

module.exports = router;