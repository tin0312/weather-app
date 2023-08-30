import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import FutureWeather from "./components/FutureWeather";
import { getSixDaysWeather } from "./services/api";
import {
  celsiusToFah,
  fahToCelsius,
  kelToCelsius,
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
    allTemp: []
  });

  let convertedTempCurrent;
  let covertedTempHightLights
  const [tempUnit, setTempUnit] = useState("Celsius");
  const toogleCelsius = () => {
    if (tempUnit === "Celsius") {
      convertedTempCurrent = weatherData.currentWeather.temp
      covertedTempHightLights = weatherData.currentWeather.temp
    } else if (tempUnit === "Fah") {
      setTempUnit("Celsius");
      convertedTempCurrent = fahToCelsius(weatherData.currentWeather.temp);
      covertedTempHightLights = weatherData.currentWeather.temp
    }
    setWeatherData({
      ...weatherData,
      currentWeather: {
        ...weatherData.currentWeather,
        temp: convertedTempCurrent,
      },
      weatherHightLights: {
        ...weatherData.weatherHightLights,
        feels_like: covertedTempHightLights,
      }
    });
  };

  const toogleFah = () => {
    if (tempUnit === "Celsius") {
      setTempUnit("Fah");
      convertedTempCurrent = celsiusToFah(weatherData.currentWeather.temp);
      covertedTempHightLights = celsiusToFah(weatherData.currentWeather.temp);

    }else if(tempUnit === "Fah"){
      convertedTempCurrent = weatherData.currentWeather.temp
      covertedTempHightLights = weatherData.currentWeather.temp
    }
    setWeatherData({
      ...weatherData,
      currentWeather: {
        ...weatherData.currentWeather,
        temp: convertedTempCurrent,
        },
      weatherHightLights: {
        ...weatherData.weatherHightLights,
        feels_like: covertedTempHightLights,
      }
    })
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
        const allTemp = currentWeather.list.map(day => {
          return {
            temp: kelToCelsius(day.temp.day),
            feels_like: kelToCelsius(day.feels_like.day),
            temp_min: kelToCelsius(day.temp.min),
            temp_max: kelToCelsius(day.temp.max)
          }
        })  
        setWeatherData({
          currentWeather: {
            time_stamp: currentWeather.list[0].dt,
            temp: allTemp[0].temp,
            weather: currentWeather.list[0].weather[0].main,
            name: currentWeather.city.name,
          },
          weatherHightLights: {
            wind_speed: currentWeather.list[0].speed,
            wind_direction: currentWeather.list[0].deg,
            feels_like:allTemp[0].feels_like,
            humidity: currentWeather.list[0].humidity,
            air_pressure: currentWeather.list[0].pressure,
          },
          forecast_data: forecastData,
          allTemp: allTemp
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
        tempUnit = {tempUnit}
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

New Lay


*/
/*

const list = [
  {temp.day, feels_like.day,  temp.min, temp.max},
  {temp.day, feels_like.day,  temp.min, temp.max},
  {temp.day, feels_like.day,  temp.min, temp.max},
  {temp.day, feels_like.day,  temp.min, temp.max},
  {temp.day, feels_like.day,  temp.min, temp.max}
  {temp.day, feels_like.day,  temp.min, temp.max}
]

=>>> combine all values of 6 Obj together and put in an array
*/
/*
map through each object and store 4 arrays of each key values in each object in a new object 
const allTemp = list.map(day => {
  return {
    temp: temp.day,
    feels_like: day.feels_like.day,
    temp_min: day.temp.min,
    temp_max: day.temp.max]
  }
})  
*/
