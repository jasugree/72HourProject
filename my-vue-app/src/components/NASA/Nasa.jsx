import React, { useState, useEffect } from "react";
import fiveDaysAgo from "../../helpers/fiveDaysAgo"; //function that returns date for query
import loading from "../OpenWeather/assets/loading.gif";
import "./Nasa.css";

const Nasa = (props) => {
  const { lat, lon } = props.coordinates;

  const apiKey = "qwOijB0BlWxLDopTggwefGV4GwqvhBJ1nlbFRw5M";

  const [url, setUrl] = useState("");
  const [nasaPhoto, setNasaPhoto] = useState(null);

  const fetchFromNasa = async () => {
    if (!lat || !lon) return; // I THINK HAD TO ADD THIS LINE I THINK B/C OF STRING INTERPOLATION IN handleCoordinates()
    try {
      const res = await fetch(url + apiKey);
      const blob = await res.blob();

      setNasaPhoto(URL.createObjectURL(blob));
    } catch (err) {
      console.error(
        "Uh oh... There seems to be an error. Luckily the dev added this catch so the page should still work!"
      );
    }
  };

  const fetchRevGeo = async () => {
    if (!lat || !lon) return;

    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const json = await res.json();
      document.title = (json.city ? json.city : json.locality) + " Events";
    } catch (err) {
      console.error(err);
    }
  };

  const handleCoordinates = () => {
    setUrl(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${fiveDaysAgo()}&dim=.03&api_key=`
    );
  };

  useEffect(handleCoordinates, [props.coordinates]);
  useEffect(fetchRevGeo, [props.coordinates]);
  useEffect(fetchFromNasa, [url]);

  return (
    <div className="nasaApp">
      {nasaPhoto ? (
        <div className="nasa-image-container">
          <h2>You Are Here</h2>
          <p className="nasa-pin" title="YOU ARE HERE">
            📌
          </p>
          <img src={nasaPhoto} alt="" className="nasa-image" />
        </div>
      ) : (
        <div className="nasa-loading">
          <img src={loading} alt="" className="nasa-loading-gif" />
        </div>
      )}
    </div>
  );
};

export default Nasa;
