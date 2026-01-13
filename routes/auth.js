const express = require("express");

const router = express();
const { createOtp, verifyOtp, currentStep } = require("../controllers/auth.js");
const { verifyToken } = require("../middlewares/auth.js");

router.post("/createOtp", createOtp);
router.get("/verifyOtp", verifyOtp);
router.get("/currentStep", verifyToken, currentStep);

module.exports = router;
