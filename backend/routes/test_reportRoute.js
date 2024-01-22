const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
    Controllers.test_reportController.getTest_reports(res);
});

router.post("/create", (req, res) => {
    Controllers.test_reportController.createTest_report(req.body, res)
});

router.put("/:id", (req, res) => {
    Controllers.test_reportController.updateTest_report(req, res);
});

router.delete("/:id", (req, res) => {
    Controllers.test_reportController.deleteTest_report(req, res);
})

module.exports = router;