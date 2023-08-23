import React from "react";
import moment from "moment";

export default function CurrentWeatherCard({ currentWeather }) {
  const { weather, main, name, dt } = currentWeather;
  const weatherDescription = weather.length > 0 ? weather[0]?.main : "";
  const CelsiusTemp = (main.temp - 273.15).toFixed(0)
  
  const formattedDate = moment(dt).format(' dddd, D MMMM');

  return (
    <div className="currentWeatherCard-wrapper">
      <div className="currenWeatherCard">
        <img
          src={weatherDescription === "Clear" ? "src/assets/Clear.png" : "src/assets/LightCloud.png"}
          alt="status"
        />
        <h1 className="temperature"> {`${CelsiusTemp} °C` } </h1>
        <h2 className="activity">{weatherDescription}</h2>
      </div>
      <div className="date-location">
        <h3 className="date">{`Today  •   ${formattedDate}`}</h3>
        <h3 className="location">
          <span className="material-symbols-outlined">location_on</span>
          {name}
        </h3>
      </div>
    </div>
  );
}



/*

Task 1: Get the current time
- Install moment.js : npm install moment --save
- moment(unixTimeStamp).format()
Task 2: Find users current location

- use browser API : navigator.geolocation to get the lat & lon
- use useEffect to get the current location
- use useState to store the current location


Task 3: Get the current weather data for the users location
- Give API call function 2 arguments : lat & lon
- Pass geolocation state as parameters to API call to get the most updated location

Task 4: Search for all location on search bar

- A state to save user input to in seach bar 

- Take that input and find geolocation

- Take that geolocation and append it with API call function

*/