import React, { useState } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import LocationSearch from "./LocationSearch";
import { getSixDaysWeather } from "../services/api";
import { kelToCelsius } from "../utils/temperatureUtils";

export default function CurrentWeather({ currentWeather, tempUnit, searchWeatherData, setSearchWeatherData }) {
  
  const { searchCurrentWeather } = searchWeatherData
  const onSearchChange = (searchData) => {
    const [searchLat, searchLon] = searchData.value.split(" ");
    const fetchSearchWeather = async () => {
      try {
        const searchWeather = await getSixDaysWeather(searchLat, searchLon);
        const allTemp = searchWeather.list.map((day) => {
          return {
            temp: kelToCelsius(day.temp.day),
            feels_like: kelToCelsius(day.feels_like.day),
            temp_min: kelToCelsius(day.temp.min),
            temp_max: kelToCelsius(day.temp.max),
          };
        });
        setSearchWeatherData({
          searchCurrentWeather: {
            time_stamp: searchWeather.list[0].dt,
            temp: allTemp[0].temp,
            weather: searchWeather.list[0].weather[0].main,
            name: searchWeather.city.name,
          },
          searchWeatherHightLights: {
            wind_speed: searchWeather.list[0].speed,
            wind_direction: searchWeather.list[0].deg,
            feels_like: allTemp[0].feels_like,
            humidity: searchWeather.list[0].humidity,
            air_pressure: searchWeather.list[0].pressure,
          }
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
          searchWeatherData.searchCurrentWeather.name ? searchCurrentWeather : currentWeather
        }
        tempUnit={tempUnit}
      />
    </div>
  );
}
