import React from "react";
import RoundTripCard from "./RoundTripCard";


const RoundTripResults = ({ outbound, returnFlights, onSelect }) => {
  if (!outbound || !returnFlights) {
    return <p>Loading flight data...</p>;
  }

  const combinations = [];

  outbound.forEach((out) => {
    returnFlights.forEach((ret) => {
      if (
        out.origin === ret.destination &&
        out.destination === ret.origin &&
        out.fund && ret.fund && out.fund === ret.fund
      ) {
        combinations.push({
          id: `${out.id}-${ret.id}`,
          outbound: out,
          return: ret,
          totalPrice: parseFloat(out.price) + parseFloat(ret.price)
        });
      }
    });
  });

  return (
    <div className="results">
      {combinations.length > 0 ? (
        combinations.map((combo) => (
          <RoundTripCard key={combo.id} combo={combo} onSelect={onSelect} />
        ))
      ) : (
        <p>No round trip options available with same fund type.</p>
      )}
    </div>
  );
};

export default RoundTripResults;
