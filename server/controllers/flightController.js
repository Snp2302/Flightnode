const db = require("../config/db");

exports.searchOneWay = (req, res) => {
  const { origin, destination, date } = req.body;

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

    const flights = results.map(flight => ({
      ...flight,
      flight_date: date,
    }));

    return res.status(200).json({ flights });
  });
};

exports.searchRoundTrip = (req, res) => {
  const { origin, destination, startDay, returnDay, startDate, returnDate } = req.body;

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
      console.error("Outbound error:", err);
      return res.status(500).json({ error: "Database error." });
    }

    // ✅ Add date to outbound flights
    outboundResults.forEach(flight => {
      flight.flight_date = startDate;
    });

    db.query(returnQuery, [destination, origin, returnDay], (err, returnResults) => {
      if (err) {
        console.error("Return error:", err);
        return res.status(500).json({ error: "Database error." });
      }

      // ✅ Add date to return flights
      returnResults.forEach(flight => {
        flight.flight_date = returnDate;
      });

      return res.status(200).json({
        outbound: outboundResults,
        returnFlights: returnResults,
      });
    });
  });
};

