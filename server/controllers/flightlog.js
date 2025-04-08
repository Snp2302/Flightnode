const fs = require("fs");
const path = require("path");

exports.searchFlights = (req, res) => {
  const searchData = req.body;

  // Log request
  const logEntry = {
    time: new Date().toLocaleString(),
    request: searchData,
  };

  // Get matching flights
  const sql = `
    SELECT * FROM flight_list 
    WHERE origin = ? AND destination = ? 
    AND day = DAYNAME(?)`;

  db.query(sql, [searchData.origin, searchData.destination, searchData.departure_date], (err, results) => {
    if (err) {
      logEntry.error = err;
    } else {
      logEntry.response = results;
    }

    // Write to log file
    const logPath = path.join(__dirname, "../logs/flight-search-log.json");
    const logData = JSON.stringify(logEntry, null, 2);

    // Ensure the /logs directory exists
    const logDir = path.join(__dirname, "../logs");
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    // Append log
    fs.appendFile(logPath, logData + ",\n", (writeErr) => {
      if (writeErr) console.error("Failed to write log:", writeErr);
    });

    if (err) {
      return res.status(500).json({ error: "Flight search failed" });
    }

    res.json(results);
  });
};
