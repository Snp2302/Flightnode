import React, { useState } from "react";
import OneWayResults from "./OneWayResults";
import RoundTripResults from "./RoundTripResults";
import axios from "axios";

const Home = () => {
  const [tripType, setTripType] = useState("oneway");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tripType === "oneway") {
      const res = await axios.post("http://localhost:5000/api/flights/search/oneway", {
        origin,
        destination,
        date,
      });
      setResults({ type: "oneway", flights: res.data });
    } else {
      const res = await axios.post("http://localhost:5000/api/flights/search/roundtrip", {
        origin,
        destination,
        startDay: new Date(date).toLocaleString("en-US", { weekday: "long" }),
        returnDay: new Date(returnDate).toLocaleString("en-US", { weekday: "long" })
      });
      setResults({ type: "roundtrip", outbound: res.data.outbound, returnFlights: res.data.return });
    }
  };

  return (
    <div className="container">
      <h1>Flight Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="radio" value="oneway" checked={tripType === "oneway"} onChange={() => setTripType("oneway")} />
          One Way
        </label>
        <label>
          <input type="radio" value="roundtrip" checked={tripType === "roundtrip"} onChange={() => setTripType("roundtrip")} />
          Round Trip
        </label>

        <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
        <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        {tripType === "roundtrip" && (
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
        )}
        <button type="submit">Search Flights</button>
      </form>

      {results && results.type === "oneway" && <OneWayResults flights={results.flights} />}
      {results && results.type === "roundtrip" && (
        <RoundTripResults outbound={results.outbound} returnFlights={results.returnFlights} />
      )}
    </div>
  );
};

export default Home;
