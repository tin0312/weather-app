import React, { useState, useEffect } from "react";
import { formattedDate } from "../utils/dateUtils";
import * as weatherIcon from "../assets";
import { nanoid } from "nanoid";

export default function CurrentWeatherCard({
  currentWeather,
  tempUnit,
  locationName,
  searchCoords
}) {
  const { weather, temp, name, time_stamp } = currentWeather;
  const date = formattedDate(time_stamp);
  const weatherIcons =
    weather === "Clear"
      ? weatherIcon.clearIcon
      : weather === "Clouds" && weather.description === "few clouds"
      ? weatherIcon.lightCloudIcon
      : weather === "Clouds" && weather.description === "overcast clouds"
      ? weatherIcon.heavyCloudIcon
      : weather === "Clouds"
      ? weatherIcon.lightCloudIcon
      : weather === "Rain" && currentWeather.description === "light rain"
      ? weatherIcon.lightRainIcon
      : weather === "Rain" && currentWeather.description === "very heavy rain"
      ? weatherIcon.heavyRainIcon
      : weather === "Rain" && currentWeather.description === "shower rain"
      ? weatherIcon.showerIcon
      : weather === "Rain"
      ? weatherIcon.heavyRainIcon
      : weather === "Snow"
      ? weatherIcon.snowIcon
      : weather === "Snow" && currentWeather.description === "sleet"
      ? weatherIcon.sleetIcon
      : weather === "Thunderstorm"
      ? weatherIcon.thunderstormIcon
      : "";

 // Initialize location and locationId
 const favLocation = JSON.stringify(locationName);
 const favCoords = JSON.stringify(searchCoords)
 const [isPinned, setIsPinned] = useState(false);

 // Function to check if location is saved in local storage
 const isLocationSaved = () => localStorage.getItem(favLocation) !== null;

 // Handle favorite place toggle
 const toggleSavePlaces = () => {
   if (!isLocationSaved()) {
     localStorage.setItem(favLocation, favCoords);
   } else {
     localStorage.removeItem(favLocation);
   }
   setIsPinned(isLocationSaved());
 }
 useEffect(() => {
   setIsPinned(isLocationSaved());
 }, [favLocation]);
  return (
    <div className="current-weather-display">
      <div className="current-weather-card">
        <img src={weatherIcons} alt="weather-icon" />
        <h1 className="current-temperature">
          {temp} <span>{tempUnit === "Celsius" ? "°C" : "°F"}</span>
        </h1>
        <h2 className="current-weather-condition">{weather}</h2>
      </div>
      <div className="current-date-container">
        <h3 className="date">
          <pre>{`Today • ${date}`}</pre>
        </h3>
        <h3 className="current-location">
          <span
            onClick={toggleSavePlaces}
            className="material-symbols-outlined"
          >
            {" "}
            {isPinned ? "pin_drop" : "location_on"}
          </span>

          {name}
        </h3>
      </div>
    </div>
  );
}
