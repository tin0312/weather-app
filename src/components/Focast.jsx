import React from "react";
import moment from "moment";

export default function Focast({ forecastData }) {
  const forecastCards = forecastData.map((card, index) => {
    const CelsiusMin = (card.temp.min - 273.15).toFixed(0);
    const CelsiusMax = (card.temp.max - 273.15).toFixed(0);
    const formattedDate = moment.unix(card.dt).utc().format(" ddd, D MMM");
    const weatherIcon =
     card.weather[0].main === "Clear"
        ? "src/assets/Clear.png"
        :card.weather[0].main === "Clouds" &&
         card.weather[0].description === "few clouds"
        ? "src/assets/LightCloud.png"
        :card.weather[0].main === "Clouds" &&
         card.weather[0].description === "overcast clouds"
        ? "src/assets/HeavyCloud.png"
        :card.weather[0].main === "Clouds"
        ? "src/assets/LightCloud.png"
        :card.weather[0].main === "Rain" && card.description === "light rain"
        ? "src/assets/LightRain.png"
        :card.weather[0].main === "Rain" && card.description === "very heavy rain"
        ? "src/assets/HeavyRain.png"
        :card.weather[0].main === "Rain" && card.description === "shower rain"
        ? "src/assets/Shower.png"
        :card.weather[0].main == "Rain"
        ? "src/assets/LightRain.png"
        :card.weather[0].main === "Snow"
        ? "src/assets/Snow.png"
        :card.weather[0].main === "Snow" && card.description === "sleet"
        ? "src/assets/Sleet.png"
        :card.weather[0].main === "Thunderstorm"
        ? "src/assets/Thunderstorm.png"
        : "";
    return (
      <div key={index} className="future-card">
        <h3>{index === 0 ? "Tommorow" : formattedDate}</h3>
        <img src={weatherIcon} alt="weather-icon" />
        <p>
          {CelsiusMax} °C <span>{CelsiusMin} °C</span>
        </p>
      </div>
    );
  });
  return <div className="future-cards">{forecastCards}</div>;
}
