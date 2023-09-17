import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import { getSixDaysWeather } from "./services/api";
import {
  celsiusToFah,
  fahToCelsius,
  kelToCelsius,
} from "./utils/temperatureUtils";

function App(){
  // saved weather coords
  const [savedCoords, setSavedCoords] = useState({
    lat: "",
    lon: "",
  });

  // search weather coords
  const [searchCoords, setSearchCoords] = useState({
    lat: "",
    lon: "",
  });

  // current user location
  const [currentCoords, setCurrentCoords] = useState({
    lat: 0,
    lon: 0,
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
      wind_degree: "",
      feels_like: "",
      humidity: "",
      air_pressure: "",
    },
    forecast_data: [],
    allTemp: [],
  });
// display saved weather
const [isDiplayed, setIsDisplayed] = useState(false)
  // toogle Celsius
  let mainTemp;
  let hightlightTemp;
  const [tempUnit, setTempUnit] = useState("Celsius");
  const toogleCelsius = () => {
    if (tempUnit === "Celsius") {
      mainTemp = weatherData.currentWeather.temp;
      hightlightTemp = weatherData.weatherHightLights.feels_like;
    } else if (tempUnit === "Fah") {
      setTempUnit("Celsius");
      mainTemp = fahToCelsius(weatherData.currentWeather.temp);
      hightlightTemp = fahToCelsius(weatherData.weatherHightLights.feels_like);
    }
    setWeatherData({
      ...weatherData,
      currentWeather: {
        ...weatherData.currentWeather,
        temp: mainTemp,
      },
      weatherHightLights: {
        ...weatherData.weatherHightLights,
        feels_like: hightlightTemp,
      },
    });
  };
  // toogle Fah
  const toogleFah = () => {
    if (tempUnit === "Celsius") {
      setTempUnit("Fah");
      mainTemp = celsiusToFah(weatherData.currentWeather.temp);
      hightlightTemp = celsiusToFah(weatherData.weatherHightLights.feels_like);
    } else if (tempUnit === "Fah") {
      mainTemp = weatherData.currentWeather.temp;
      hightlightTemp = weatherData.weatherHightLights.feels_like;
    }
    setWeatherData({
      ...weatherData,
      currentWeather: {
        ...weatherData.currentWeather,
        temp: mainTemp,
      },
      weatherHightLights: {
        ...weatherData.weatherHightLights,
        feels_like: hightlightTemp,
      },
    });
  };

  // get current location
  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        });
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };
    fetchGeolocation();
  }, []);

  // get weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let weatherSource = null;
        const savedWeather = await getSixDaysWeather(
          savedCoords.lat,
          savedCoords.lon
        );
        const searchWeather = await getSixDaysWeather(
          searchCoords.lat,
          searchCoords.lon
        );
        const currentWeather = await getSixDaysWeather(
          currentCoords.lat,
          currentCoords.lon
        );
        if (isDiplayed){
            weatherSource = savedWeather
            setIsDisplayed(false)
        } else if (searchCoords.lat && searchCoords.lon ) {
          weatherSource = searchWeather;
        } else {
          weatherSource = currentWeather;
        } 

        const forecastData = weatherSource.list.slice(1);
        const allTemp = weatherSource.list.map((day) => {
          return {
            temp: kelToCelsius(day.temp.day),
            feels_like: kelToCelsius(day.feels_like.day),
            temp_min: kelToCelsius(day.temp.min),
            temp_max: kelToCelsius(day.temp.max),
          };
        });
        setWeatherData({
          currentWeather: {
            time_stamp: weatherSource.list[0].dt,
            temp: allTemp[0].temp,
            weather: weatherSource.list[0].weather[0].main,
            name: weatherSource.city.name,
          },
          weatherHightLights: {
            wind_speed: weatherSource.list[0].speed,
            wind_degree: weatherSource.list[0].deg,
            feels_like: allTemp[0].feels_like,
            humidity: weatherSource.list[0].humidity,
            air_pressure: weatherSource.list[0].pressure,
          },
          forecast_data: forecastData,
          allTemp: allTemp,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWeatherData();
  }, [currentCoords, searchCoords, savedCoords]);

  return (
    <div className="main-container">
      <CurrentWeather
        currentWeather={weatherData.currentWeather}
        tempUnit={tempUnit}
        setSearchCoords={setSearchCoords}
        searchCoords={searchCoords}
        setSavedCoords={setSavedCoords}
        setIsDisplayed = {setIsDisplayed}
      />
      <WeatherDetails
        tempUnit={tempUnit}
        toogleCelsius={toogleCelsius}
        toogleFah={toogleFah}
        weatherHightLights={weatherData.weatherHightLights}
        forecastData={weatherData.forecast_data}
        allTemp={weatherData.allTemp}
      />
    </div>
  );
}
export default App;
