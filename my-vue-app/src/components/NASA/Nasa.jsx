import React, { useState, useEffect } from "react"
import todaysDate from "../../helpers/todaysDate"

const Nasa = props => {
  const { lat, lon } = props.coordinates

  const apiKey = "qwOijB0BlWxLDopTggwefGV4GwqvhBJ1nlbFRw5M"

  const [url, setUrl] = useState('')
  const [nasaPhoto, setNasaPhoto] = useState(null)

// JAKE's DATE FIX <3
const newDate = new Date()
const year = newDate.getFullYear()
const month = newDate.getMonth() + 1
const date = newDate.getDate()

  const fetchFromNasa = async () => {
    console.log('Checking for coordinates')
    if (!lat || !lon) return // I THINK HAD TO ADD THIS LINE I THINK B/C OF STRING INTERPOLATION IN handleCoordinates()
    console.log('Fetching from Nasa')

    const res = await fetch(url + apiKey)
    const blob = await res.blob()


    setNasaPhoto(URL.createObjectURL(blob))
  }

  const handleCoordinates = () => {
    setUrl(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${todaysDate()}&dim=.03&api_key=`
    )
    console.log('Set the URL')
  }

  useEffect(handleCoordinates, [props.coordinates])
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