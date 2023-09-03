import React, { useState } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import LocationSearch from "./LocationSearch";
import { getSixDaysWeather } from "../services/api";
import { kelToCelsius, celsiusToFah } from "../utils/temperatureUtils";

export default function CurrentWeather({
  currentWeather,
  tempUnit,
  setSearchWeatherData,
}) {
  const onSearchChange = (searchData) => {
    // get lat & lon coords from the searchData
    const [searchLat, searchLon] = searchData.value.split(" ");
    const fetchSearchWeather = async () => {
      try {
        // get searched location weather
        const searchWeather = await getSixDaysWeather(searchLat, searchLon);
        const forecastData = searchWeather.list.slice(1);
        const allTemp = searchWeather.list.map((day) => {
          return {
            temp: kelToCelsius(day.temp.day),
            feels_like: kelToCelsius(day.feels_like.day),
            temp_min: kelToCelsius(day.temp.min),
            temp_max: kelToCelsius(day.temp.max),
          };
        });
        // convert temp to fahrenheit when tempUnit is Fa across all data sources
        if (tempUnit === "Fah") {
          allTemp[0].temp = celsiusToFah(allTemp[0].temp);
        }

        // set searched location weather
        setSearchWeatherData({
          searchCurrentWeather: {
            time_stamp: searchWeather.list[0].dt,
            temp: allTemp[0].temp,
            weather: searchWeather.list[0].weather[0].main,
            name: searchWeather.city.name,
          },
          searchWeatherHightLights: {
            wind_speed: searchWeather.list[0].speed,
            wind_degree: searchWeather.list[0].deg,
            feels_like: allTemp[0].feels_like,
            humidity: searchWeather.list[0].humidity,
            air_pressure: searchWeather.list[0].pressure,
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
    <div className="current-weather-container">
      <div className="search-bar-container">
        <LocationSearch onSearchChange={onSearchChange} />
        <span className="material-symbols-outlined">share_location</span>
      </div>
      <CurrrentWeatherCard
        currentWeather={currentWeather}
        tempUnit={tempUnit}
      />
    </div>
  );
}
