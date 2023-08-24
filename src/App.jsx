import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import FutureWeather from "./components/FutureWeather";
import { getSixDaysWeather } from "./services/api";

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
  });

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
        const currentWeather = await getSixDaysWeather(
          geolocation.latitude,
          geolocation.longitude
        );
        setWeatherData({
          currentWeather: {
            time_stamp: currentWeather.list[0].dt,
            temp: currentWeather.list[0].temp.day,
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
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchGeolocation();
  }, [geolocation]);
  return (
    <div className="main-wrapper">
      <CurrentWeather
        currentWeather={weatherData.currentWeather}
      />
      <FutureWeather weatherHightLights={weatherData.weatherHightLights} />
    </div>
  );
}

export default App;

/*Matching Data

const getCurrentData = async () => {
  const currentData = await getCurrentData ({

  }

  setWeatherData =
  
  )
}


data.list[0] = 

{
  
  "dt":1692896400, 
  "sunrise":1692873127,
  "sunset":1692922093,
  "temp":{"day":293.91,"min":290.75,"max":294.97,"night":292.71,"eve":294.11,"morn":290.97},
  "feels_like":{"day":294.26,"night":293.12,"eve":294.43,"morn":291.31},
  "pressure":1011,
  "humidity":85,
  "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
  "speed":3.6,
  "deg":113,
  "gust":5.98,
  "clouds":100,
  "pop":0.63,
  "rain":1.36
}
...
...
...
...
{...}



 setWeatherData({
          currentWeather: {
            main: currentWeather.main, // degree 
            weather: currentWeather.weather, // weather status
            name: currentWeather.name, // city name
          },
          weatherHightLights: {
            wind_speed: currentWeather.list[0].speed,
            wind_direction: currentWeather.list[0].
            feels_like: currentWeather.list[0].feels_like.day,
            humidity: currentWeather.list[0].humidity,
            air_pressure: currentWeather.list[0].pressure
          },
        })











*/
