import React, { useState, useEffect } from "react";
import "./App.css";
import Nasa from "./components/NASA/Nasa";
import OpenWeather from "./components/OpenWeather/OpenWeather";
import TicketMaster from "./components/TicketMaster/TicketMaster";
import { Container, Row, Col } from 'reactstrap';
import day from "./components/assets/day.jpg"
import evening from "./components/assets/evening.jpg"
import morning from "./components/assets/morning.jpg"
import night from "./components/assets/night.jpg"


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

//Greeting Function
let today = new Date()
let curHr = today.getHours()

let greeting = "Hello there"
let image = "blue"

console.log(curHr);


 
if (curHr >22 || curHr < 6){
  greeting = 'Good Night'
  image = night
}else if (curHr < 12) {
  greeting ='Good Morning'
  image = morning
} else if (curHr < 18) {
  greeting = 'Good Afternoon'
  image = day
} else {
  greeting = 'Good Evening'
  image = evening
}

  return (
    <div className="App" style={{ 
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${image})`  
    }}>
      <Container>
        <Row>
          <h1 className="greeting">{greeting}</h1>
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
