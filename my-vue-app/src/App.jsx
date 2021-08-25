import React, { useState } from "react";
import "./App.css";
import Nasa from "./components/NASA/Nasa";
import OpenWeather from "./components/OpenWeather/OpenWeather";
import TicketMaster from "./components/TicketMaster/TicketMaster";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Hello, World</h1>
      <Nasa />
      <OpenWeather />
      <TicketMaster />
    </div>
  );
}

export default App;
