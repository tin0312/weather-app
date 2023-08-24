import React, { useState, useEffect } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import LocationSearch from "./LocationSearch";
import { getCurrentWeather } from "../services/api";

export default function CurrentWeather({ currentWeather }) {
  const [searchWeatherData, setSearchWeatherData] = useState({
      main: {},
      weather: [],
      name: "",
  })
  const onSearchChange = (searchData) => {
    console.log(searchData)
        const [searchLat, searchLon] = searchData.value.split(" ");
      const fetchSearchWeather = async () =>{
        try {
          const currentWeather = await getCurrentWeather(searchLat, searchLon)
          setSearchWeatherData({
            main: currentWeather.main,
            weather: currentWeather.weather,
            name: currentWeather.name,
          })
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } 
      fetchSearchWeather()
  };

  return (
    <div className="current-weather">
      <div className="search-bar">
        <LocationSearch onSearchChange={onSearchChange} />
        <span className="material-symbols-outlined">share_location</span>
      </div>
      { searchWeatherData.name?
        <CurrrentWeatherCard currentWeather={searchWeatherData} /> :
        <CurrrentWeatherCard currentWeather={currentWeather} />
      }
    </div>
  );
}
