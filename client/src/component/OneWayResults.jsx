import React from "react";
import "./OneWayResults.css";

const OneWayResults = ({ flights, onSelect }) => {
  if (!Array.isArray(flights) || flights.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="oneway-container">
      {flights.map((flight, index) => (
        <div key={index} className="oneway-card">
          <div className="middle">
            <div className="header">{flight.origin} → {flight.destination}</div>
            <p className="flight-info">Flight Name: {flight.flight_name}</p>
            <p className="flight-info">Date: {flight.flight_date} ({flight.day})</p>
            <p className="flight-info">Take Off: {flight.take_off_time}</p>
            <p className="flight-info">Landing: {flight.landing_time}</p>
          </div>

          <div className="right">
            <p className="total-price">Price: ₹{flight.price}</p>
            <p className="fund">{flight.fund}</p>
            <button className="select-btn" onClick={() => onSelect(flight)}>SELECT</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OneWayResults;
