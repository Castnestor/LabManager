const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { verifyToken, requireAdmin } = require("../middleware/authentication");

router.get("/", (req, res) => {
    Controllers.userController.getUsers(res);
});

router.post("/create", verifyToken, requireAdmin, (req, res) => {
    Controllers.userController.createUser(req.body, res)
});

router.post("/register", (req, res) => {
    Controllers.userController.registerUser(req, res)
});

router.post("/login", (req, res) => {
    Controllers.userController.loginUser(req, res)
});

router.put("/:id", (req, res) => {
    Controllers.userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
    Controllers.userController.deleteUser(req, res);
})

module.exports = router;