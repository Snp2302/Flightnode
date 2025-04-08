const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/confirm", bookingController.confirmBooking);  // POST /api/bookings/confirm
router.get("/list", bookingController.getBookingList);      // GET /api/bookings/list

module.exports = router;
