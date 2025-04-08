import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PassengerModal.css";


const PassengerModal = ({ passengerCount, onClose, onSubmit, selectedFlight }) => {
  const navigate = useNavigate();

  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: passengerCount }, () => ({
      first_name: "",
      last_name: "",
      age: "",
      gender: ""
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const handleSubmit = () => {
    const totalPrice = selectedFlight.price * passengerDetails.length;
  
    onSubmit(passengerDetails);
  
    navigate("/summary", {
      state: {
        flight: { ...selectedFlight, totalPrice }, // ✅ Add totalPrice
        passengers: passengerDetails
      }
    });
  };
  

  return (
    <div className="modal">
      <h3>Enter Passenger Details</h3>
      {passengerDetails.map((passenger, index) => (
        <div key={index} className="passenger-form">
          <input
            type="text"
            placeholder="First Name"
            value={passenger.first_name}
            onChange={(e) => handleChange(index, "first_name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={passenger.last_name}
            onChange={(e) => handleChange(index, "last_name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={passenger.age}
            onChange={(e) => handleChange(index, "age", e.target.value)}
          />
          <select
            value={passenger.gender}
            onChange={(e) => handleChange(index, "gender", e.target.value)}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default PassengerModal;
