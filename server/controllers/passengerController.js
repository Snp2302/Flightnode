const db = require("../config/db");

exports.addPassengers = async (req, res) => {
    const { outbound_id, return_id, passengers } = req.body;
  
    if (!outbound_id) {
      return res.status(400).json({ error: "Missing outbound_id" });
    }
  
    try {
      for (const passenger of passengers) {
        const { first_name, last_name, age, gender } = passenger;
  
        await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO passengers 
             (first_name, last_name, age, gender, outbound_flight_id, return_flight_id) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, age, gender, outbound_id, return_id || null],
            (err, result) => {
              if (err) {
                console.error("DB insert error:", err);
                return reject(err);
              }
              resolve(result);
            }
          );
        });
      }
  
      res.status(201).json({ message: "Passengers added successfully" });
    } catch (err) {
      console.error("Error adding passengers:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };