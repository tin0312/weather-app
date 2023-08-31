import React from "react";
import { formattedDate } from "../utils/dateUtils";
import * as weatherIcon from "../assets"

export default function CurrentWeatherCard({ currentWeather, tempUnit }) {
  const { weather, temp, name, time_stamp } = currentWeather;
  const date = formattedDate(time_stamp)
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
  return (
    <div className="currentWeatherCard-wrapper">
      <div className="currenWeatherCard">
        <img src={weatherIcons} alt="weather-icon" />
        <h1 className="current-temperature">{temp} <span>{tempUnit === "Celsius" ? "°C" : "°F"}</span></h1>
        <h2 className="current-weather-condition">{weather}</h2>
      </div>
      <div className="current-date">
        <h3 className="date"><pre>{`Today • ${date}`}</pre></h3>
        <h3 className="current-location">
          <span className="material-symbols-outlined">location_on</span>
            {name}
        </h3>
      </div>
    </div>
  );
}
