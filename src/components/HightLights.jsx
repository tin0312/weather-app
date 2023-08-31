import React from "react";
export default function HightLights({ weatherHightLights, tempUnit }) {
  const { wind_speed, wind_degree, humidity, air_pressure, feels_like } =
    weatherHightLights;
    console.log(humidity)
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
          <p> {wind_speed} mph</p>
          <p>
            <span id = "wind-direction-arrow" className={` material-symbols-outlined ${wind_arrow_direction}`}>navigation</span>
            {wind_direction}
          </p>
        </div>
        <div className="today-feature">
          <h3>Humidity</h3>
          <p> {humidity} %</p>
          <div className="humidity-container">
           <div className="humidity-labels">
                <span>0</span>
                <span>50</span>
                <span>100</span>
          </div> 
          <div className="humidity-bar">
            <div className="humidity-filled" style = { {width : `${humidity}%`}}></div>
          </div>
        </div>
          </div>
        <div className="today-feature" id="visibility">
          <h3>Feel Like</h3>
          <p> {`${feels_like} ${tempUnit === "Celsius" ? "°C" : "°F"}`}</p>
        </div>
        <div className="today-feature " id="air">
          <h3>Air Pressure</h3>
          <p> {air_pressure} mb</p>
        </div>
      </div>
    </div>
  );
}
