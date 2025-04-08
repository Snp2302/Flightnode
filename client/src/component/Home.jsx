import React, { useState } from "react";
import "./Home.css";
import OneWayResults from "./OneWayResults";
import RoundTripResults from "./RoundTripResults";
import PassengerModal from "./PassengerModal"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tripType, setTripType] = useState("oneway");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [results, setResults] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null); // ✅ for selected flight(s)
  const [showModal, setShowModal] = useState(false); // ✅ control modal visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tripType === "oneway") {
      const res = await axios.post("http://localhost:5000/api/flights/search/oneway", {
        origin,
        destination,
        date,
        passengerCount,
      });
      setResults({ type: "oneway", flights: res.data.flights });
    } else {
      const res = await axios.post("http://localhost:5000/api/flights/search/roundtrip", {
        origin,
        destination,
        startDate: date,
        returnDate,
        startDay: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
        returnDay: new Date(returnDate).toLocaleDateString("en-US", { weekday: "long" }),
        passengerCount,
      });

      setResults({
        type: "roundtrip",
        outbound: res.data.outbound,
        returnFlights: res.data.returnFlights,
      });
    }
  };

  const handleSelect = (flightData) => {
    setSelectedFlight(flightData);
    setShowModal(true);
  };

  const handlePassengerSubmit = async (passengerData) => {
    let outbound_id = null;
    let return_id = null;

    if (selectedFlight?.outbound && selectedFlight?.return) {
      outbound_id = selectedFlight.outbound.id;
      return_id = selectedFlight.return.id;
    } else {
      // one way
      outbound_id = selectedFlight.id;
    }

    try {
      await axios.post("http://localhost:5000/api/passengers/add", {
        outbound_id,
        return_id,
        passengers: passengerData,
      });
      alert("Passenger details saved!");
    } catch (err) {
      alert("Error saving passengers");
    }

    setShowModal(false);
    setSelectedFlight(null);
  };

  return (
    <div className="flight-container">
      <button onClick={() => navigate("/bookings")}>Booking List</button>
      <div className="flight-search">
      <h1>Flight Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
          />
          One Way
        </label>
        <label>
          <input
            type="radio"
            value="roundtrip"
            checked={tripType === "roundtrip"}
            onChange={() => setTripType("roundtrip")}
          />
          Round Trip
        </label>

        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        {tripType === "roundtrip" && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        )}
        <input
          type="number"
          name="passengerCount"
          placeholder="Number of Passengers"
          min={1}
          max={6}
          value={passengerCount}
          onChange={(e) => setPassengerCount(parseInt(e.target.value))}
          required
        />
        <button type="submit">Search Flights</button>
      </form>
      </div>
      <div className="flight-results">
      {/* ✅ Render Results */}
      {results?.type === "oneway" && (
        <OneWayResults flights={results.flights} onSelect={handleSelect} />
      )}

      {results?.type === "roundtrip" && (
        <RoundTripResults
          outbound={results.outbound}
          returnFlights={results.returnFlights}
          onSelect={handleSelect}
        />
      )}
       </div>
          {showModal && (
                 <PassengerModal
                 passengerCount={passengerCount}
                 selectedFlight={selectedFlight} // ✅ Pass selected flight
                 tripType={tripType}             // Optional, but useful
                 onClose={() => setShowModal(false)}
                 onSubmit={handlePassengerSubmit}
                 />
           )}

    </div>
  );
};

export default Home;
