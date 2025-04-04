import React from "react";

const FlightCard = ({ flight }) => {
  return (
    <div className="card">
      <p><strong>{flight.origin}</strong> → <strong>{flight.destination}</strong></p>
      <p>Day: {flight.day}</p>
      <p>Price: ₹{flight.price}</p>
    </div>
  );
};

export default FlightCard;
