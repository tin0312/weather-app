import React, { useState, useEffect } from "react";
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
  const [searchCoords, setSearchCoords] = useState({
    lat: "",
    lon: "",
  });
  const [saveCoords, setSavedCoords] = useState({
    lat: "",
    lon: "",
  }); // get sacved location coords
  const [savedLocation, setSavedLocation] = useState(null); // get saved location
  console.log("Saved Location:", savedLocation)
  const [isOpenned, setIsOpenned] = useState(false);
  const [favLocations, setFavLocations] = useState([]);

  const onSearchChange = (searchData) => {
    // get lat & lon coords from the searchData
    const [searchLat, searchLon] = searchData.value.split(" ");
    const [name] = searchData.label.split(", ");
    setLocationName(name);
    setSearchCoords({
      lat: searchLat,
      lon: searchLon,
    });
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
  const handleFavDropdown = () => {
    let updatedFavLocations = [];
    setIsOpenned((isOpenned) => !isOpenned);
    for (let i = 0; i < localStorage.length; i++) {
      let key = JSON.parse(localStorage.key(i) || "{}");
      updatedFavLocations.push(key);
    }
    setFavLocations(updatedFavLocations);
  };

  const closeFavDropDown = () => {
    setIsOpenned(false);
  };
// retrieve saved location
  const handleSavedLocationClick = (location) => {
    setSavedLocation(location);
    setIsOpenned(false);
  };
  
 // Retrieve location coords
useEffect(() => {
  const getSavedCoords = () => {
    console.log(typeof(savedLocation))
    const value = localStorage.getItem(savedLocation || "{}");
    const { lat, lon } = JSON.parse(value || "{}");
    console.log("Latitude:", lat, "Longitude:", lon);
    setSavedCoords({
      lat: lat,
      lon: lon,
    });
  };
  getSavedCoords();
}, [savedLocation]);


  return (
    <div className="current-weather-container">
      <div className="search-bar-container">
        <LocationSearch onSearchChange={onSearchChange} />
        {!isOpenned ? (
          <span
            onClick={handleFavDropdown}
            className="material-symbols-outlined saved-location"
          >
            share_location
          </span>
        ) : (
          <span
            onClick={closeFavDropDown}
            className="material-symbols-outlined saved-location"
          >
            saved_search
          </span>
        )}
      </div>
      {isOpenned ? (
        <FavouriteLocations
          favLocations={favLocations}
          handleSavedLocationClick = {handleSavedLocationClick}
        />
      ) : (
        <CurrrentWeatherCard
          currentWeather={currentWeather}
          tempUnit={tempUnit}
          locationName={locationName}
          searchCoords={searchCoords}
        />
      )}
    </div>
  );
}
