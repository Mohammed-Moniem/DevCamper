const express = require("express");
const { register, login, getMyAccount } = require("../controllers/auth");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/my-account").get(protect, getMyAccount);

module.exports = router;
