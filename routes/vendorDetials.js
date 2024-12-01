const express = require("express");

const router = express();
const {
  addVendorDetails,
  editVendorDetails,
  getVendorDetails,
  updateVendorStatus,
} = require("../controllers/vendorDetails");
const { verifyToken } = require("../middlewares/auth");

router.post("/addVendorDetails", verifyToken, addVendorDetails);
router.get("/getVendorDetails", verifyToken, getVendorDetails);
router.post("/editVendorDetails", verifyToken, editVendorDetails);
router.post("/updateVendorStatus", verifyToken, updateVendorStatus);

module.exports = router;
