import React from "react";
import FlightCard from "./FlightCard";

const RoundTripResults = ({ outbound, returnFlights }) => {
  return (
    <div className="results">
      <h2>Outbound Flights</h2>
      {!outbound || outbound.length === 0 ? (
        <p>No outbound flights.</p>
      ) : (
        outbound.map(f => <FlightCard key={`out-${f.id}`} flight={f} />)
      )}

      <h2>Return Flights</h2>
      {!returnFlights || returnFlights.length === 0 ? (
        <p>No return flights.</p>
      ) : (
        returnFlights.map(f => <FlightCard key={`ret-${f.id}`} flight={f} />)
      )}
    </div>
  );
};

export default RoundTripResults;
