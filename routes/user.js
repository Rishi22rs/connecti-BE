const express = require("express");
const { getNearbyVendors } = require("../controllers/user");

const router = express();

router.get("/getNearbyVendors", getNearbyVendors);

module.exports = router;
