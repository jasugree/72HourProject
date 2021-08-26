import React, { useState } from "react";

const TicketMaster = (props) => {
  const tmURL = `https://app.ticketmaster.com/discovery/v2/events.json?=`;
  const tmApiKey = `z9FbfmWQ9JpgGduaGIdTGJ4olsaOvkLb`;

  const [eventList, setEventList] = useState("");

  const fetchTmURL = async () => {
    const response = await fetch(`${tmURL}${tmApiKey}`, {
      mode: "no-cors",
      method: "POST",
    });
    const tmData = await response.json();

    setEventList(tmData.value);
    console.log;
  };

  function handleClick() {
    fetchTmURL();
  }

  return (
    <div>
      <h1>Ticket Master - Events Nearby!</h1>
      <p>{eventList}</p>
      <button onClick={handleClick}>Click for nearby events</button>
    </div>
  );
};

export default TicketMaster;
