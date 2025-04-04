import React from "react";

const OneWayResults = ({ flights }) => {
  if (!Array.isArray(flights) || flights.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      {flights.map((flight, index) => (
        <div key={index} className="card">
          <h3>{flight.origin} → {flight.destination}</h3>
          <p>Flight Name: {flight.flight_name}</p>
          <p>Day: {flight.day}</p>
          <p>Price: ₹{flight.price}</p>
          <p>Take Off: {flight.take_off_time}</p>
          <p>Landing: {flight.landing_time}</p>
        </div>
      ))}
    </div>
  );
};

export default OneWayResults;
