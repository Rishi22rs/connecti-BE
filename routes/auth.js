const express = require("express");

const router = express();
const { createOtp, verifyOtp } = require("../controllers/auth.js");
const { verify } = require("jsonwebtoken");

router.post("/createOtp", createOtp);
router.get("/verifyOtp", verifyOtp);

module.exports = router;