import React, { useState, useEffect } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import { getCodingLocation, getCurrentWeather } from "../services/api";

export default function CurrentWeather({
  currentWeather,
  setWeatherData,
}) {
  const [userInput, setUserInput] = useState("");
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  }
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchCodingLocation()
    }
  }
  useEffect(() => {
    const fetchCodingLocation = async () => {
      try {
        const codingData = await getCodingLocation(userInput);
        const codingWeather = await getCurrentWeather(
          codingData[0].geometry.location.lat,
          codingData[0].geometry.location.lng
        );
        setWeatherData({
          currentWeather: {
            main: codingWeather.main,
            weather: codingWeather.weather,
            name: codingWeather.name,
          },
          weatherHightLights: {
            wind: codingWeather.wind,
            visibility: codingWeather.visibility,
            main: codingWeather.main,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } 
    fetchCodingLocation()
  }, [ userInput, setWeatherData])
  
  return (
    <div className="current-weather">
      <div className="search-bar">
        <form action="">
          <input
            onChange={handleUserInput}
            onKeyDown = {handleSearch}
            type="search"
            id="query"
            name="query"
            placeholder="Search for places"
            value={userInput}
          />
        </form>
        <span className="material-symbols-outlined">share_location</span>
      </div>
      <CurrrentWeatherCard currentWeather={currentWeather} />
    </div>
  );
}

/*

users enter location => gets save in a state 


*/
