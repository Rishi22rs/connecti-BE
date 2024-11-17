const express = require("express");

const router = express();
const {
  addVendorDetails,
  editVendorDetails,
} = require("../controllers/vendorDetails");
const { verifyToken } = require("../middlewares/auth");

router.post("/addVendorDetails", addVendorDetails);
router.post("/editVendorDetails", editVendorDetails);

module.exports = router;
