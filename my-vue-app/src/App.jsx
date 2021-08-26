import React, { useState, useEffect } from "react";
import "./App.css";
import Nasa from "./components/NASA/Nasa";
import OpenWeather from "./components/OpenWeather/OpenWeather";
import TicketMaster from "./components/TicketMaster/TicketMaster";

function App() {
  const [coordinates, setCoordinates] = useState({})

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition( // THIS JS METHOD ASKS CLIENT FOR PERMISSION TO USE POSITION
      position => {                           // TAKES A CALLBACK
      console.log(position)                   // LOG POSITION SO WE CAN SEE WHAT WE ARE WORKING WITH
      setCoordinates({ lat: position.coords.latitude, lon: position.coords.longitude }) // SET STATE OBJECT 'coordinates'... { coordinates.lat } and { coordinates.lon } 
    })
  }

  useEffect(getLocation, []) // RUN getLocation() WHEN App.js mounts

  return (
    <div className="App">
      <h1>Hello, World</h1>
      <Nasa coordinates={coordinates}/> {/*PASSING COORDINATES STATE TO NASA CHILD*/}
      <OpenWeather />
      <TicketMaster />
    </div>
  );
}

export default App;