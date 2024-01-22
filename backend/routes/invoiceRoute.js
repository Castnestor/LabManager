const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
    Controllers.invoiceController.getInvoices(res);
});

router.post("/create", (req, res) => {
    Controllers.invoiceController.createInvoice(req.body, res)
});

router.put("/:id", (req, res) => {
    Controllers.invoiceController.updateInvoice(req, res);
});

router.delete("/:id", (req, res) => {
    Controllers.invoiceController.deleteInvoice(req, res);
})

module.exports = router;