import React from "react";
import * as weatherIcon from "../assets";
import { formattedDate } from "../utils/dateUtils";
/*
  const CelsiusMin = (card.temp.min - 273.15).toFixed(0);
    const CelsiusMax = (card.temp.max - 273.15).toFixed(0);

*/
export default function Focast({ forecastData, allTemp, tempUnit }) {
  const forecastCards = forecastData.map((card, index) => {
    const date = formattedDate(card.dt);
    const weatherIcons =
      card.weather[0].main === "Clear"
        ? weatherIcon.clearIcon
        : card.weather[0].main === "Clouds" &&
          card.weather[0].description === "few clouds"
        ? weatherIcon.lightCloudIcon
        : card.weather[0].main === "Clouds" &&
          card.weather[0].description === "overcast clouds"
        ? weatherIcon.heavyCloudIcon
        : card.weather[0].main === "Clouds"
        ? weatherIcon.lightCloudIcon
        : card.weather[0].main === "Rain" && card.description === "light rain"
        ? weatherIcon.lightRainIcon
        : card.weather[0].main === "Rain" &&
          card.description === "very heavy rain"
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
        const temp = allTemp[index];
        console.log(temp)
    return (
      <div key={index} className="future-card">
        <h3>{index === 0 ? "Tommorow" : date}</h3>
        <img src={weatherIcons} alt="weather-icon" />
          <p>
            {`${temp.temp_max} ${tempUnit === "Celsius" ? "°C" : "°F"}`}{" "}
            <span>{`${temp.temp_min} ${tempUnit === "Celsius" ? "°C" : "°F"}`}</span>
          </p>
      </div>
    );
  });
  return <div className="future-cards">{forecastCards}</div>;
}
