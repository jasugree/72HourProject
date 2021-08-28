import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";

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

  useEffect(handlePropsChange, [props.coordinates]);

  useEffect(fetchTmURL, [url]);

  const tmEventMapper = () => {
    return eventList.map((event) => {
      return (
        <tr key={event.id}>
          <td>{event.name}</td>
          <td>{event.type}</td>
          <td>{event.dates.start.localDate}</td>
          <td>{event.distance} mi.</td>
          <td>
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              <Button color="primary">Purchase Tickets</Button>
            </a>
          </td>
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
              <th>name:</th>
              <th>type:</th>
              <th>date:</th>
              <th>distance:</th>
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
