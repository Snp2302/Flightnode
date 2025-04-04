const db = require("../config/db");

exports.searchOneWay = (req, res) => {
    const { origin, destination, date } = req.body;
  
    // Convert full date (e.g., "2025-03-02") to day name (e.g., "Sunday")
    const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
  
    const query = `
      SELECT * FROM flight_list
      WHERE origin = ? AND destination = ? AND day = ?
    `;
  
    db.query(query, [origin, destination, day], (err, results) => {
      if (err) {
        console.error("One-way search error:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      return res.status(200).json({ flights: results });
    });
  };
  
exports.searchRoundTrip = (req, res) => {
    const { origin, destination, startDay, returnDay } = req.body;
  
    console.log("Round Trip Search Request:");
    console.log("Origin:", origin);
    console.log("Destination:", destination);
    console.log("Start Date:", startDay);
    console.log("Return Date:", returnDay);
  
    const outboundQuery = `
      SELECT * FROM flight_list
      WHERE origin = ? AND destination = ? AND day = ?
    `;
  
    const returnQuery = `
      SELECT * FROM flight_list
      WHERE origin = ? AND destination = ? AND day = ?
    `;
  
    db.query(outboundQuery, [origin, destination, startDay], (err, outboundResults) => {
      if (err) {
        console.error("Outbound error:", err);  // 👈 log the real SQL error
        return res.status(500).json({ error: "Database error." });
      }
  
      db.query(returnQuery, [destination, origin, returnDay], (err, returnResults) => {
        if (err) {
          console.error("Return error:", err);  // 👈 log the real SQL error
          return res.status(500).json({ error: "Database error." });
        }
  
        return res.status(200).json({
          outbound: outboundResults,
          returnFlights: returnResults,
        });
      });
    });
  };
  