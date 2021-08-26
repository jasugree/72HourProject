import React, { useState, useEffect } from "react";

const TicketMaster = (props) => {
  const { lat, lon } = props.coordinates;
  console.log(props.coordinates);
  const tmURL = `https://app.ticketmaster.com/discovery/v2/events/.json?latlong=${lat},${lon}&`;
  const tmApiKey = `z9FbfmWQ9JpgGduaGIdTGJ4olsaOvkLb`;

  const [eventList, setEventList] = useState("");

  const fetchTmURL = async () => {
    const response = await fetch(`${tmURL}${tmApiKey}`);
    const tmData = await response.json();

    setEventList(tmData.value);
    console.log(tmData);
  };

  function handleClick() {
    fetchTmURL();
  }

  //uef
  useEffect(() => {}, []);

  return (
    <div>
      <h1>Ticket Master - Events Nearby!</h1>
      <p>{eventList}</p>
      <button onClick={handleClick}>Click for nearby events</button>
    </div>
  );
};

export default TicketMaster;
