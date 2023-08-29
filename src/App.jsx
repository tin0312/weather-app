import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import FutureWeather from "./components/FutureWeather";
import { getSixDaysWeather } from "./services/api";
import {
  celsiusToFah,
  fahToCelsius,
  kelToCelsius,
  kelToFah,
} from "./utils/temperatureUtils";

function App() {
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [weatherData, setWeatherData] = useState({
    currentWeather: {
      time_stamp: "",
      temp: "",
      weather: "",
      name: "",
    },
    weatherHightLights: {
      wind_speed: "",
      wind_direction: "",
      feels_like: "",
      humidity: "",
      air_pressure: "",
    },
    forecast_data: [],
  });

let convertedTemp;
const [tempUnit, setTempUnit] = useState("Celsius");
const toogleCelsius = () => {
  if (tempUnit === "Celsius") {
    convertedTemp = weatherData.currentWeather.temp
  } else if (tempUnit === "Fah") {
    setTempUnit("Celsius");
    convertedTemp = fahToCelsius(weatherData.currentWeather.temp);
  }
  setWeatherData({
    ...weatherData,
    currentWeather: {
      ...weatherData.currentWeather,
      temp: convertedTemp,
    },
  });
};

const toogleFah = () => {
  if (tempUnit === "Celsius") {
    setTempUnit("Fah");
    convertedTemp = celsiusToFah(weatherData.currentWeather.temp);
    console.log(convertedTemp)
 } else if (tempUnit === "Fah"){
    convertedTemp = weatherData.currentWeather.temp
  }
  setWeatherData({
    ...weatherData,
    currentWeather: {
      ...weatherData.currentWeather,
      temp: convertedTemp,
    },
  });
};


  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };
    fetchGeolocation();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentWeather = await getSixDaysWeather(
          geolocation.latitude,
          geolocation.longitude
        );
        const forecastData = currentWeather.list.slice(1);
        const defaultTemp = kelToCelsius(currentWeather.list[0].temp.day)
        setWeatherData({
          currentWeather: {
            time_stamp: currentWeather.list[0].dt,
            temp: defaultTemp,
            weather: currentWeather.list[0].weather[0].main,
            name: currentWeather.city.name,
          },
          weatherHightLights: {
            wind_speed: currentWeather.list[0].speed,
            wind_direction: currentWeather.list[0].deg,
            feels_like: currentWeather.list[0].feels_like.day,
            humidity: currentWeather.list[0].humidity,
            air_pressure: currentWeather.list[0].pressure,
          },
          forecast_data: forecastData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWeatherData();
  }, [geolocation]);
  return (
    <div className="main-wrapper">
      <CurrentWeather
        currentWeather={weatherData.currentWeather}
        setWeatherData={setWeatherData}
        tempUnit = {tempUnit}
      />
      <FutureWeather
        toogleCelsius={toogleCelsius}
        toogleFah={toogleFah}
        weatherHightLights={weatherData.weatherHightLights}
        forecastData={weatherData.forecast_data}
      />
    </div>
  );
}

export default App;
/*

Architecture

App -> Current Weather + Future Weather


CurrentWeather -> SearchBar + CurrentWeatherCard


FutureWeather -> WeatherHightLights + FutureWeatherCard

*/

/*

New architecture

- App

-> Current Weather(Search Bar +  CurrentWeather + HightLights)

-> Focast

Data Flow

-Users location -> Current Weather -> HightLights -> Forecast 

-SearchBar -> CurrentWeather -> HightLights -> Forecast



*/

/*

New Layout 

<div d-flex >

  <CurrentWeather>


<div>




*/
