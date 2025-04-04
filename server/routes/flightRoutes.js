const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

// One Way
router.post("/search/oneway", flightController.searchOneWay);

// Round Trip
router.post("/search/roundtrip", flightController.searchRoundTrip);

module.exports = router;
