
import React, { useState, useEffect } from 'react';
import loading from './assets/loading.gif'

const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const key = "4e3b2fbc699bc6dfe7707088a630fb92";

const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const key = '4e3b2fbc699bc6dfe7707088a630fb92';

const OpenWeather = (props) => {
  const { lat, lon } = props.coordinates;

const [url, seturl] = useState("");
const [temperature, settemperature] = useState("");
const [icon, seticon] = useState(null);
const [isImperial, setIsImperial] = useState(true);

  const fetchResults = async () => {
    if (!lat || !lon) return;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    settemperature(data.main.temp);
    seticon(data.weather[0].icon);
  };

  const handleCoordinates = () => {
    seturl(`${baseURL}?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`);
    console.log("OpenWeather URL set");
  };

  useEffect(handleCoordinates, [props.coordinates]);
  useEffect(fetchResults, [url]);
  
  const unitToggle = () =>{
    if(isImperial) {
      settemperature((temperature - 32) * 5 / 9)
    }else{ settemperature(temperature * 9 / 5  + 32)}
      setIsImperial(!isImperial);
    }

  return (
    <div className="weatherApp">
      <h2>OpenWeather API</h2>

      <img style={{maxWidth : 30}}className="weatherIcon" src={icon ? `https://openweathermap.org/img/wn/${icon}.png` : loading} alt="icon" />
            <br />
      <p> The temperature is: <span className="temperature">{Math.round(temperature)} °{isImperial ? "F" : "C"}</span></p>
      <button className="weatherButton" onClick={unitToggle }>Change Unit</button>
    </div>
  );
};

export default OpenWeather;
