import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

const TicketMaster = (props) => {
  const { lat, lon } = props.coordinates;
  const [url, setUrl] = useState("");
  console.log(props.coordinates);
  const tmApiKey = `z9FbfmWQ9JpgGduaGIdTGJ4olsaOvkLb`;

  const [eventList, setEventList] = useState("");

  const fetchTmURL = async () => {
    if (!lat || !lon) return;

    try {
      const response = await fetch(url);
      const tmData = await response.json();

      setEventList(tmData._embedded.events);
      console.log(tmData._embedded.events);
    } catch (err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
  };

  function handlePropsChange() {
    setUrl(
      `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${lat},${lon}&apikey=${tmApiKey}`
    );
  }
  //uef
  useEffect(handlePropsChange, [props.coordinates]);

  useEffect(fetchTmURL, [url]);

  const tmEventMapper = () => {
    return eventList.map((event) => {
      return (
        <tr key={event.id}>
          {/* <th scope="row">{event.id}</th> */}
          <td>{event.name}</td>
          <td>{event.type}</td>
          <td>{event.url}</td>
        </tr>
      );
    });
  };

  return (
    <div className="ticketApp">
      <h1>Ticket Master - Events Nearby!</h1>
      <hr />
      <div className="eventTable">
      <Table striped>
        <thead>
          <tr>
            {/* <th>id:</th> */}
            <th>name:</th>
            <th>type:</th>
            <th>link:</th>
          </tr>
        </thead>
        <tbody>{eventList ? tmEventMapper() : null}</tbody>
      </Table>
      </div>
    </div>
  );
};

export default TicketMaster;
