import React from "react";
export default function HightLights({ weatherHightLights, tempUnit }) {
  const { wind_speed, wind_degree, humidity, air_pressure, feels_like } =
    weatherHightLights;
  const wind_direction =
    wind_degree >= 0 && wind_degree < 22.5
      ? "N"
      : wind_degree < 45
      ? "NNE"
      : wind_degree < 67.5
      ? "NE"
      : wind_degree < 90
      ? "ENE"
      : wind_degree < 112.5
      ? "E"
      : wind_degree < 135
      ? "ESE"
      : wind_degree < 157.5
      ? "SE"
      : wind_degree < 180
      ? "SSE"
      : wind_degree < 202.5
      ? "S"
      : wind_degree < 225
      ? "SSW"
      : wind_degree < 247.5
      ? "SW"
      : wind_degree < 270
      ? "WSW"
      : wind_degree < 292.5
      ? "W"
      : wind_degree < 315
      ? "WNW"
      : wind_degree < 337.5
      ? "NW"
      : wind_degree < 360
      ? "NNW"
      : "N";

// render wind_arrow based on wind_degree
 const arrowClassList = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW","WSW","W","WNW","NW","NNW"];
 const wind_arrow_direction = arrowClassList[Math.floor(wind_degree  / 22.5) % 16 ]

  return (
    <div className="today-details">
      <h2 className="hightlight">Today’s Hightlights </h2>
      <div className="today-cards">
        <div className="today-feature">
          <h3>Wind status</h3>
          <p> {wind_speed} <span className="unit">mph</span></p>
          <p id="wind-direction">
            <span id = "wind-arrow" className={` material-symbols-outlined ${wind_arrow_direction}`}>navigation</span>
            {wind_direction}
          </p>
        </div>
        <div className="today-feature">
          <h3>Humidity</h3>
          <p> {humidity} <span className="unit">%</span></p>
          <div className="humidity-container">
           <div className="humidity-labels">
                <h4>0</h4>
                <h4>50</h4>
                <h4>100</h4>
          </div> 
          <div className="humidity-bar">
            <div className="humidity-filled" style = { {width : `${humidity}%`}}></div>
          </div>
        </div>
          </div>
        <div className="today-feature" id="visibility">
          <h3>Feel Like</h3>
          <p> {feels_like} <span className="unit">{tempUnit === "Celsius" ? "°C" : "°F"}</span></p>
        </div>
        <div className="today-feature " id="air">
          <h3>Air Pressure</h3>
          <p> {air_pressure} <span className="unit">mb</span></p>
        </div>
      </div>
    </div>
  );
}
