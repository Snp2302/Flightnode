require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(bodyParser.json());

app.use("/api/flights", flightRoutes);
 app.use("/api/passengers", flightRoutes);
app.use("/api/bookings", bookingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
