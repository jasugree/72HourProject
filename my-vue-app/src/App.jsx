import React, { useState, useEffect } from "react";
import "./App.css";
import Nasa from "./components/NASA/Nasa";
import OpenWeather from "./components/OpenWeather/OpenWeather";
import TicketMaster from "./components/TicketMaster/TicketMaster";
import { Container, Row, Col } from 'reactstrap';

function App() {
  const [coordinates, setCoordinates] = useState({});

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      // THIS JS METHOD ASKS CLIENT FOR PERMISSION TO USE POSITION
      (position) => {
        // TAKES A CALLBACK
        console.log(position); // LOG POSITION SO WE CAN SEE WHAT WE ARE WORKING WITH
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }); // SET STATE OBJECT 'coordinates'... { coordinates.lat } and { coordinates.lon }
      }
    );
  };

  useEffect(getLocation, []); // RUN getLocation() WHEN App.js mounts

  return (
    <div className="App">
      <Container>
        <Row>
          <h1 className="greeting">Good Evening</h1>
        </Row>
        <Row>
          <Col className="col-4">
            <OpenWeather coordinates={coordinates} />
           {/*PASSING COORDINATES STATE TO NASA CHILD*/}
            <Nasa coordinates={coordinates} />{" "}
          </Col>
          <Col className="events col-8">
            <TicketMaster coordinates={coordinates} />
          </Col>
          </Row>
      </Container>
    </div>
  );
}

export default App;
