import React from "react";
import moment from "moment";
import * as weatherIcon from "../assets"

export default function Focast({ forecastData }) {
  const forecastCards = forecastData.map((card, index) => {
    const CelsiusMin = (card.temp.min - 273.15).toFixed(0);
    const CelsiusMax = (card.temp.max - 273.15).toFixed(0);
    const formattedDate = moment.unix(card.dt).utc().format(" ddd, D MMM");
    const weatherIcons = 
    card.weather[0].main === "Clear"
      ? weatherIcon.clearIcon
      : card.weather[0].main === "Clouds" && card.weather[0].description === "few clouds"
      ? weatherIcon.lightCloudIcon
      : card.weather[0].main === "Clouds" && card.weather[0].description === "overcast clouds"
      ? weatherIcon.heavyCloudIcon
      : card.weather[0].main === "Clouds"
      ? weatherIcon.lightCloudIcon
      : card.weather[0].main === "Rain" && card.description === "light rain"
      ? weatherIcon.lightRainIcon
      : card.weather[0].main === "Rain" && card.description === "very heavy rain"
      ? weatherIcon.heavyRainIcon
      : card.weather[0].main === "Rain" && card.description === "shower rain"
      ? weatherIcon.showerIcon
      : card.weather[0].main === "Rain"
      ? weatherIcon.heavyRainIcon
      : card.weather[0].main === "Snow"
      ? weatherIcon.snowIcon
      : card.weather[0].main === "Snow" && card.description === "sleet"
      ? weatherIcon.sleetIcon
      : card.weather[0].main === "Thunderstorm"
      ? weatherIcon.thunderstormIcon
      : "";
    return (
      <div key={index} className="future-card">
        <h3>{index === 0 ? "Tommorow" : formattedDate}</h3>
        <img src={weatherIcons} alt="weather-icon" />
        <p>
          {CelsiusMax} °C <span>{CelsiusMin} °C</span>
        </p>
      </div>
    );
  });
  return <div className="future-cards">{forecastCards}</div>;
}
