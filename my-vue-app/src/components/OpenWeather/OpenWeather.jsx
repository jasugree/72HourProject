import React, { useState, useEffect } from 'react';


const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const key = '4e3b2fbc699bc6dfe7707088a630fb92';
const city =  'Westfield'
const state = 'US-IN'

let measurement = 'imperial'

let symbol = "F";

const OpenWeather = (props) => {

const [temperature, settemperature] = useState("");
const [icon, seticon] = useState();


  const fetchResults = async() => {
    let url = `${baseURL}?q=${city},${state}&appid=${key}&units=${measurement}`;  
    const response = await fetch(url)
    const data = await response.json()

    console.log(data);
    settemperature(data.main.temp);
    seticon(data.weather[0].icon)
  }

  useEffect(() => {
    fetchResults();  
  },[]);
  


  const unitChange = () =>{
    console.log('This button got clicked')
    if(measurement === 'metric'){
      measurement = 'imperial'
      symbol = "F";
    } else if(measurement === 'imperial'){
      measurement = 'metric'
      symbol = "C";
    }else{
      console.log('nothing happened')
    }
    fetchResults();  
  }

  
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