import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingList.css";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings/list").then((res) => {
      setBookings(res.data);
    });
  }, []);

  return (
    <div className="booking-list">
      <h2>Booking List</h2>
      {bookings.map((b) => (
        <div className="booking-card" key={b.booking_id}>
          <h3>{b.booking_id}</h3>
          <p>Origin: {b.origin}</p>
          <p>Destination: {b.destination}</p>
          <p>Departure: {b.departure_date}   ({b.outbound_day})</p>
          <p>Return: {b.return_date ? `${b.return_date} (${b.return_day})` : "N/A"}</p>
          <p>Flight: {b.outbound_name}</p>
          {b.return_name && <p>Return Flight: {b.return_name}</p>}
          <p>Commission: ₹{b.commission}</p>
        </div>
      ))}
    </div>
  )
};

export default BookingList;
