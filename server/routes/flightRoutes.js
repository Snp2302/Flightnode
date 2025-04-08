const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const passengerController = require("../controllers/passengerController");

router.post("/search/oneway", flightController.searchOneWay);

router.post("/search/roundtrip", flightController.searchRoundTrip);

router.post("/add", passengerController.addPassengers);

module.exports = router;
