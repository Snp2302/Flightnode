import React from "react";
import "./RoundTripResults.css";

const RoundTripCard = ({ combo, onSelect }) => {
  const { outbound, return: ret, totalPrice } = combo;

  return (
    <div className="round-trip-card">
      <div className="middle">
        <div className="header">Outbound: {outbound.origin} → {outbound.destination}</div>
        <p className="flight-info">Flight: {outbound.flight_name}</p>
        <p className="flight-info">Date: {outbound.flight_date} ({outbound.day})</p>
        <p className="flight-info">Take Off: {outbound.take_off_time}</p>
        <p className="flight-info">Landing: {outbound.landing_time}</p>

        <div className="header return-header">Return: {ret.origin} → {ret.destination}</div>
        <p className="flight-info">Flight: {ret.flight_name}</p>
        <p className="flight-info">Date: {ret.flight_date} ({ret.day})</p>
        <p className="flight-info">Take Off: {ret.take_off_time}</p>
        <p className="flight-info">Landing: {ret.landing_time}</p>
      </div>

      <div className="right">
        <p className="total-price">Total Price: ₹{totalPrice}</p>
        <p className="fund">{ret.fund}</p>
        <button className="select-btn" onClick={() => onSelect(combo)}>SELECT</button>
      </div>
    </div>
  );
};

export default RoundTripCard;
