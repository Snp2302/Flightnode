export const searchOneWayFlights = async (data) => {
    const response = await fetch("http://localhost:5000/api/flights/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await response.json();
  };
  
  export const searchRoundTripFlights = async (data) => {
    const response = await fetch("http://localhost:5000/api/flights/search/roundtrip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await response.json();
  };
  