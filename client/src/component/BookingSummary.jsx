import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SummaryPage.css";

const SummaryPage = () => {
  const { state } = useLocation();
  const { flight, passengers } = state || {};
  const [markup, setMarkup] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  if (!flight || !passengers) {
    return <div>No booking data found.</div>;
  }

  const basePrice = flight.totalPrice || 0;
  const totalWithMarkup = basePrice + parseFloat(markup || 0);
  const handleConfirmBooking = async () => {
    try {
      const outboundFlight = flight.outbound || flight; // if one-way, use main flight
      const returnFlight = flight.return || null;
  
      await axios.post("http://localhost:5000/api/bookings/confirm", {
        booking_id: "BOOK" + Date.now(),
        flight_id: outboundFlight.id,
        return_id: returnFlight ? returnFlight.id : null,
        origin: outboundFlight.origin,
        destination: outboundFlight.destination,
        departure_date: outboundFlight.flight_date,
        return_date: returnFlight ? returnFlight.flight_date : null,
        commission: parseFloat(markup || 0),
      });
  
      alert("Booking Confirmed!");
      setConfirmed(true);
    } catch (err) {
      console.error("Confirm Booking Error:", err);
      alert("Failed to confirm booking.");
    }
  };
  

  return (
    <div className="summary-container">
      <h2>Flight Summary</h2>

      <div className="flights">
        {flight.outbound && flight.return ? (
          <>
            <h3>Outbound</h3>
            <p>{flight.outbound.origin} → {flight.outbound.destination}</p>
            <p>Flight: {flight.outbound.flight_name}</p>
            <p>Time: {flight.outbound.take_off_time} - {flight.outbound.landing_time}</p>

            <h3>Return</h3>
            <p>{flight.return.origin} → {flight.return.destination}</p>
            <p>Flight: {flight.return.flight_name}</p>
            <p>Time: {flight.return.take_off_time} - {flight.return.landing_time}</p>
          </>
        ) : (
          <>
            <h3>One Way</h3>
            <p>{flight.origin} → {flight.destination}</p>
            <p>Flight: {flight.flight_name}</p>
            <p>Time: {flight.take_off_time} - {flight.landing_time}</p>
          </>
        )}

        <p><strong>Base Total Price:</strong> ₹{basePrice}</p>
      </div>

      <div className="passenger-info">
        <h3>Passenger Details</h3>
        {passengers.map((p, index) => (
          <div key={index} className="passenger-card">
            <p><span>Passenger {index + 1}</span></p>
            <p><span>Full Name:</span> {p.first_name} {p.last_name}</p>
            <p><span>Age:</span> {p.age}</p>
            <p><span>Gender:</span> {p.gender}</p>
          </div>
        ))}
      </div>

      <div className="markup-section">
        <label>Markup Price (₹): </label>
        <input
          type="number"
          value={markup}
          onChange={(e) => setMarkup(e.target.value)}
        />
        <p><strong>Total With Markup:</strong> ₹{totalWithMarkup}</p>
      </div>

      {!confirmed ? (
        <button onClick={handleConfirmBooking}>CONFIRM AND BOOK</button>
      ) : (
        <h3>✅ BOOKING CONFIRMED</h3>
      )}
    </div>
  );
};

export default SummaryPage;
