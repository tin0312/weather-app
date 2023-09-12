import React, { useState, useEffect } from "react";
import CurrrentWeatherCard from "./CurrentWeatherCard";
import LocationSearch from "./LocationSearch";
import FavouriteLocations from "./FavourtiteLocations";
import { getSixDaysWeather, getWeatherByCoords } from "../services/api"; // Import the new API function
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
  const [savedCoords, setSavedCoords] = useState({
    lat: "",
    lon: "",
  }); // get saved location coords
  const [isDisplayed, setIsDisplayed] = useState(false); // display saved location weather
  const [savedLocation, setSavedLocation] = useState(null); // get saved location
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
        const weatherData = isDisplayed ? await getWeatherByCoords(savedCoords.lat, savedCoords.lon) : searchWeather;
        const forecastData = weatherData.list.slice(1);
        const allTemp = weatherData.list.map((day) => {
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
            time_stamp: weatherData.list[0].dt,
            temp: allTemp[0].temp,
            weather: weatherData.list[0].weather[0].main,
            name: weatherData.city.name,
          },
          searchWeatherHightLights: {
            wind_speed: weatherData.list[0].speed,
            wind_degree: weatherData.list[0].deg,
            feels_like: allTemp[0].feels_like,
            humidity: weatherData.list[0].humidity,
            air_pressure: weatherData.list[0].pressure,
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

  useEffect(() => {
    const getSavedCoords = () => {
      const value = localStorage.getItem(savedLocation || "{}");
      const { lat, lon } = JSON.parse(value || "{}");
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
          setIsDisplayed={setIsDisplayed}
          setSavedLocation={setSavedLocation}
          setIsOpenned={setIsOpenned}
          setSavedCoords={setSavedCoords} // Pass setSavedCoords to FavouriteLocations
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
