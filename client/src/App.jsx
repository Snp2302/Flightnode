import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import SummaryPage from "./component/BookingSummary";
import BookingList from "./component/BookingList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/bookings" element={<BookingList />} />
      </Routes>
    </Router>
  );
}

export default App;
