const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
    Controllers.clientController.getClients(res);
});

router.post("/create", (req, res) => {
    Controllers.clientController.createClient(req.body, res)
});

router.put("/:id", (req, res) => {
    Controllers.clientController.updateClient(req, res);
});

router.delete("/:id", (req, res) => {
    Controllers.clientController.deleteClient(req, res);
})

module.exports = router;