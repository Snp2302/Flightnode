require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const flightRoutes = require("./routes/flightRoutes");

const app = express();

// ✅ Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",  // React app
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ Parse incoming JSON
app.use(bodyParser.json());

// ✅ Routes
app.use("/api/flights", flightRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
