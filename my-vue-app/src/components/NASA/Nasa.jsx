import React, { useState, useEffect } from "react"

const Nasa = (props) => {
  const apiKey = "qwOijB0BlWxLDopTggwefGV4GwqvhBJ1nlbFRw5M"

  const [url, setUrl] = useState('')
  const [coordinates, setCoordinates] = useState({})
  const [nasaPhoto, setNasaPhoto] = useState(null)

  const fetchFromNasa = async () => {
    // console.log('Checking for coordinates')
    if (!coordinates.lat || !coordinates.lon) return // I THINK HAD TO ADD THIS LINE B/C OF STRING INTERPOLATION IN handleCoordinates()
    // console.log('Fetching from Nasa')

    const res = await fetch(url + apiKey)
    const blob = await res.blob()

    setNasaPhoto(URL.createObjectURL(blob))
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoordinates({ lat: pos.coords.latitude, lon: pos.coords.longitude })
    })
    // console.log('Got location, set coordinates')
  }

  const handleCoordinates = () => {
    setUrl(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${coordinates.lon}&lat=${coordinates.lat}&dim=.03&api_key=`
    )
    // console.log('Set the URL')
  }

  useEffect(getLocation, [])
  useEffect(handleCoordinates, [coordinates])
  useEffect(fetchFromNasa, [url])

  return (
    <div style={{display: 'flex', flexFlow: 'column wrap', alignItems: 'center'}}>
      <div>Nasa</div>
      {nasaPhoto ? (
        <img src={nasaPhoto} alt="" style={{ height: 200 }} />
      ) : (
        <div style={{height: 200, width: 200, backgroundColor: 'grey'}}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default Nasa

/*
Things i have done:
 - added fetch to Nasa component
 - added useState, useEffect 

*/
