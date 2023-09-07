import React, { useState } from "react";
import { formattedDate } from "../utils/dateUtils";
import * as weatherIcon from "../assets";

export default function CurrentWeatherCard({
  currentWeather,
  tempUnit,
  locationName,
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
/*

- toogle add 0:haiphong and increase id by 1

- go back and toogle to check 1:haiphong , this fails to add 

- then go to else if to remove the prev element 

+ toogle add 0:haiphong and increase id by 1

+ toogle add 1: hanoi and increase id by 1; now the id is 2 

+ toogle one more would remove 1: hanoi 

*/
  const [isPinned, setIsPinned] = useState(false);
  const [locationId, setLocationId] = useState(0);
  // handle favPlace toogle
  const toogleSavePlaces = () => {
    let key = `location ${locationId}`;
    let prevKey = `location ${locationId - 1}`;
    setIsPinned(true);
    // check if current key value doesnt exist and not the same with the prevKey if any
    if (
      localStorage.getItem(key) === null &&
      localStorage.getItem(prevKey) !== JSON.stringify(locationName)
    ) {
      // if no add to storage
      localStorage.setItem(key, JSON.stringify(locationName));
      setLocationId(locationId + 1);
      // remove the same element  
    } else if (localStorage.getItem(prevKey) !== null) {
      setIsPinned(false);
      localStorage.removeItem(prevKey);
      setLocationId(locationId - 1);
    } 
  };

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
            onClick={toogleSavePlaces}
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
