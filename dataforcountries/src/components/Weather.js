import React, { useState, useEffect } from 'react'
import getWeather from '../services/weatherApi'

const Weather = ({ capital }) => {
    const [weather, setWeather ] = useState()
    useEffect(() => {
        getWeather(capital).then(e => setWeather(e))
    },[capital])
    
    if (weather === undefined) {
        return <p>Loading...</p>
    } else {
        const temp = weather.temperature
        const iconUrl = weather.weather_icons[0]
        const wind_speed = weather.wind_speed
        const wind_dir = weather.wind_dir
    return (
        <form>
            <b>Temperature: </b> {temp} °C
            <br />
            <img src={iconUrl} alt="No found" height='50' width='50' />
            <br/>
            <b>Wind: </b> {wind_speed} Mph Direcction {wind_dir}
        </form>
    )
    }
}

export default Weather