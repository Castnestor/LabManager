const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
    Controllers.testController.getTests(res);
});

router.post("/create", (req, res) => {
    Controllers.testController.createTest(req.body, res)
});

router.put("/:id", (req, res) => {
    Controllers.testController.updateTest(req, res);
});

router.delete("/:id", (req, res) => {
    Controllers.testController.deleteTest(req, res);
})

module.exports = router;