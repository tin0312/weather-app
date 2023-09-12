import React, { useState } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import LocationSearch from "./LocationSearch";
import FavouriteLocations from "./FavourtiteLocations";
import { getSixDaysWeather } from "../services/api";
import { kelToCelsius, celsiusToFah } from "../utils/temperatureUtils";

export default function CurrentWeather({
  currentWeather,
  tempUnit,
  setSearchWeatherData,
}) {
  const [locationName, setLocationName] = useState("");
  const onSearchChange = (searchData) => {
    // get lat & lon coords from the searchData
    const [searchLat, searchLon] = searchData.value.split(" ");
    const [name] = searchData.label.split(", ");
    setLocationName(name);
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
  // render saved places from local storage
  const [isOpenned, setIsOpenned] = useState(false);
  const [favLocations, setFavLocations] = useState([])
  const handleFavDropdown = () => {
    let updatedFavLocations = []
    setIsOpenned((isOpenned) => !isOpenned);
    for (let i = 0; i < localStorage.length; i++) {
      let key = JSON.parse(localStorage.key(i));
      updatedFavLocations.push(key)
    }
    setFavLocations(updatedFavLocations)
  };
  return (
    <div className="current-weather-container">
      <div className="search-bar-container">
        <LocationSearch onSearchChange={onSearchChange} />
        <span onClick={handleFavDropdown} className="material-symbols-outlined">
          share_location
        </span>
      </div>
      {isOpenned ? (
        <FavouriteLocations favLocations={favLocations}/>
      ) : (
        <CurrrentWeatherCard
          currentWeather={currentWeather}
          tempUnit={tempUnit}
          locationName={locationName}
        />
      )}
    </div>
  );
}
