const db = require("../config/db");

// bookingController.js
exports.confirmBooking = (req, res) => {
    const {
      booking_id,
      flight_id,
      return_id,
      origin,
      destination,
      departure_date,
      return_date,
      commission,
    } = req.body;
  
    const sql = `
      INSERT INTO bookings_list
      (booking_id, flight_id, return_id, origin, destination, departure_date, return_date, commission)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    db.query(
      sql,
      [booking_id, flight_id, return_id, origin, destination, departure_date, return_date, commission],
      (err, result) => {
        if (err) {
          console.error("MySQL Insert Error:", err); // ADD THIS
          return res.status(500).json({ error: "Failed to insert booking" });
        }
        res.json({ message: "Booking confirmed!" });
      }
    );
  };

  exports.getBookingList = (req, res) => {
    const sql = `
      SELECT b.booking_id, b.departure_date, b.return_date, b.commission,
             f1.flight_name AS outbound_name, f1.origin, f1.destination, f1.take_off_time, f1.landing_time, f1.day AS outbound_day, f1.price AS outbound_price,
             f2.flight_name AS return_name, f2.take_off_time AS return_takeoff, f2.landing_time AS return_landing, f2.day AS return_day, f2.price AS return_price
      FROM bookings_list b
      LEFT JOIN flight_list f1 ON b.flight_id = f1.id
      LEFT JOIN flight_list f2 ON b.return_id = f2.id
      ORDER BY b.id DESC
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Failed to fetch booking list:", err);
        return res.status(500).json({ error: "Failed to fetch bookings" });
      }
      res.json(results);
    });
  };
  
  