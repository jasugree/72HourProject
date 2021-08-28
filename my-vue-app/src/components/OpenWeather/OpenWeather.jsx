import React, { useState, useEffect } from "react";
import loading from "./assets/loading.gif";

const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const key = "4e3b2fbc699bc6dfe7707088a630fb92";

// let symbol = "F";

const OpenWeather = (props) => {
  const { lat, lon } = props.coordinates;

  const [url, seturl] = useState("");
  const [temperature, settemperature] = useState("");
  const [icon, seticon] = useState(null);
  const [isImperial, setIsImperial] = useState(true);
  const [city, setcity] = useState("");
  const [description, setdescription] = useState("");

  const fetchResults = async () => {
    if (!lat || !lon) return;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setdescription(data.weather[0].description)
      setcity(data.name);
      settemperature(data.main.temp);
      seticon(data.weather[0].icon);
    } catch (err) {
      console.error(
        err,
        "There has been an error... Luckily the dev included a catch!"
      );
    }
  };

  const handleCoordinates = () => {
    seturl(`${baseURL}?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`);
  };

  useEffect(handleCoordinates, [props.coordinates]);
  useEffect(fetchResults, [url]);

  const unitToggle = () => {
    if (isImperial) {
      settemperature(((temperature - 32) * 5) / 9);
    } else {
      settemperature((temperature * 9) / 5 + 32);
    }
    setIsImperial(!isImperial);
  };

  return (
    <div className="weatherApp">
      <h2>{city}</h2>
      <p>{description}</p>
      <div className="temp">
        <img style={{maxWidth : 75}}className="weatherIcon" src={icon ? `https://openweathermap.org/img/wn/${icon}.png` : loading} alt="icon" />
        <p className="temperature">{Math.round(temperature)} °{isImperial ? "F" : "C"}</p>
      </div>
      <br />
      <button className="weatherButton" onClick={unitToggle }>Change Unit</button>


    </div>
  );
};

export default OpenWeather;
