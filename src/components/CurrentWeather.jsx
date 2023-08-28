import React, { useState } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import LocationSearch from "./LocationSearch";
import { getSixDaysWeather } from "../services/api";

export default function CurrentWeather({ currentWeather, setWeatherData }) {
  const [searchWeatherData, setSearchWeatherData] = useState({
    time_stamp: "",
    temp: "",
    weather: "",
    name: "",
  });

  const onSearchChange = (searchData) => {
    const [searchLat, searchLon] = searchData.value.split(" ");
    const fetchSearchWeather = async () => {
      try {
        const currentWeather = await getSixDaysWeather(searchLat, searchLon);
        setSearchWeatherData({
          time_stamp: currentWeather.list[0].dt,
          temp: currentWeather.list[0].temp.day,
          weather: currentWeather.list[0].weather[0].main,
          name: currentWeather.city.name,
        });
        const forecastData = currentWeather.list.slice(1)
        setWeatherData({
          currentWeather: {
            time_stamp: currentWeather.list[0].dt,
            temp: currentWeather.list[0].temp.day,
            weather: currentWeather.list[0].weather[0].main,
            name: currentWeather.city.name,
          },
          weatherHightLights: {
            wind_speed: currentWeather.list[0].speed,
            wind_direction: currentWeather.list[0].deg,
            feels_like: currentWeather.list[0].feels_like.day,
            humidity: currentWeather.list[0].humidity,
            air_pressure: currentWeather.list[0].pressure,
          },
          forecast_data: forecastData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSearchWeather();
  };

  return (
    <div className="current-weather">
      <div className="search-bar">
        <LocationSearch onSearchChange={onSearchChange} />
        <span className="material-symbols-outlined">share_location</span>
      </div>
      <CurrrentWeatherCard
        currentWeather={
          searchWeatherData.name ? searchWeatherData : currentWeather
        }
      />
    </div>
  );
}
