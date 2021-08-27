import React, { useState, useEffect } from "react";

const TicketMaster = (props) => {
  const { lat, lon } = props.coordinates;
  const [url, setUrl] = useState("");
  console.log(props.coordinates);
  const tmApiKey = `z9FbfmWQ9JpgGduaGIdTGJ4olsaOvkLb`;

  const [eventList, setEventList] = useState("");

  const fetchTmURL = async () => {
    if (!lat || !lon) return;
    const response = await fetch(url);
    const tmData = await response.json();

    setEventList(tmData._embedded.events);
    console.log(tmData._embedded.events);
  };

  // function handleClick() {
  //   fetchTmURL();
  // }

  function handlePropsChange() {
    setUrl(
      `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${lat},${lon}&apikey=${tmApiKey}`
    );
  }
  //uef
  useEffect(handlePropsChange, [props.coordinates]);

  useEffect(fetchTmURL, [url]);

  return (
    <div>
      <h1>Ticket Master - Events Nearby!</h1>
      {/* <p>{eventList}</p> */}
      {/* <button onClick={handleClick}>Click for nearby events</button> */}
    </div>
  );
};

export default TicketMaster;
