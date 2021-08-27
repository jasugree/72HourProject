import React, { useState, useEffect } from 'react';


const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const key = '4e3b2fbc699bc6dfe7707088a630fb92';
<<<<<<< HEAD
const city =  'Westfield'
const state = 'US-IN'
=======
>>>>>>> e328b675d7016287fee47f807f6f0015cd04f056

let measurement = 'imperial'

let symbol = "F";

const OpenWeather = (props) => {
const {lat, lon} = props.coordinates 

<<<<<<< HEAD
const [temperature, settemperature] = useState("");
const [icon, seticon] = useState();

=======
const [url, seturl] = useState("");
const [temperature, settemperature] = useState("");
const [icon, seticon] = useState("50d");
>>>>>>> e328b675d7016287fee47f807f6f0015cd04f056

  const fetchResults = async() => {
    if (!lat || !lon) return
    
    const response = await fetch(url)
    const data = await response.json()

    console.log(data);

    settemperature(data.main.temp);
    seticon(data.weather[0].icon)
  }
  
  const handleCoordinates = () =>{
    seturl(`${baseURL}?lat=${lat}&lon=${lon}&appid=${key}&units=imperial` )
    console.log('OpenWeather URL set')
  }
  
  useEffect (handleCoordinates, [props.coordinates])
  useEffect(fetchResults, [url])


  
  const unitChange = () =>{
    console.log(({temperature} - 32) * 5 / 9) 
    }
    unitChange();

  
  return ( 
    <div className="weatherApp">
      <h2>OpenWeather API</h2>
      <img className="weatherIcon" src={`https://openweathermap.org/img/wn/${icon}.png`} alt="icon" />
            <br />
      <p> The temperature is: <span className="temperature">{temperature} °{symbol}</span></p>
      <button className="weatherButton" onClick={unitChange}>Change Unit</button>

    </div>
   );
}
 
export default OpenWeather;