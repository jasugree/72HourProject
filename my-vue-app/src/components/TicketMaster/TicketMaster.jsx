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
    return eventList
      .sort((a, b) => (a.distance > b.distance ? 1 : -1))
      .map((event) => {
        return (
          <tr key={event.id}>
            <td>{event.name}</td>
            <td>
              {new Date(event.dates.start.localDate).toLocaleDateString()}
            </td>
            <td>{event.distance} mi.</td>
            <td>
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                <button className="weatherButton ticketButton">
                  Purchase Tickets
                </button>
              </a>
            </td>
          </tr>
        );
      });
  };

  return (
    <div className="ticketApp">
      <h2>Ticket Master - Events Nearby!</h2>
      <hr />
      <div className="eventTable">
        <Table striped>
          <thead>
            <tr>
              <th>Name:</th>
              <th>Date:</th>
              <th>Distance:</th>
              <th>Link:</th>
            </tr>
          </thead>
          <tbody>{eventList ? tmEventMapper() : null}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default TicketMaster;
