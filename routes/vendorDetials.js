const express = require("express");

const router = express();
const { addVendorDetails } = require("../controllers/vendorDetails");
const { verifyToken } = require("../middlewares/auth");

router.post("/addVendorDetails", verifyToken, addVendorDetails);

module.exports = router;
