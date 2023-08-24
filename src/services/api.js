/*

Task 2: Fetching data for 5 days in the future 

-Source: Daily Forecast 16 days

Task1: Pulling data from API 

- Source: Current Weather API 

- How to make an API call ?

+ API call: https://api.openweathermap.org/data/2.5/weather?lat=43.6534817&lon=-79.3839347&appid=573681bc8bb6fdda297f36fbefb6905c
+Direct geocoding: 

http://api.openweathermap.org/geo/1.0/direct?q=Toronto,CA&limit=1&appid=573681bc8bb6fdda297f36fbefb6905c

https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

-Result: 


const currrentWeather =

{"coord":

{"lon":-79.3839,"lat":43.6535},
"weather":[
    {
        "id":800,
        "main":"Clear",
        "description":"clear sky",
        "icon":"01d"}],

"base":"stations",
"main":
{
    "temp":296.89,
    "feels_like":296.78,
    "temp_min":295.47,
    "temp_max":298.83,
    pressure":1021,
    "humidity":56

},
"visibility":10000,
"wind":
    {
        "speed":3.6,
        "deg":50
    },
"clouds":
{
    "all":0
},
"dt":1692636391,
"sys":{
    "type":1,
    "id":718,
    "country":"CA",
    "sunrise":1692613723,
    "sunset":1692663187
    },
"timezone":-14400,
"id":6167863,
"name":"Downtown Toronto",
"cod":200
}


*/

async function getCurrentWeather(lat, lon) {
  const apiKey = "573681bc8bb6fdda297f36fbefb6905c";
  const currrentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    const response = await fetch(currrentWeatherURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Weather data collection failed:", error);
    return null;
  }
}

export { getCurrentWeather };

async function getCodingLocation(userInput) {
  const geocodingAPIKey = "AIzaSyAFDmP3CwyazBQXZaK_X9bKlmp_7XJldD0";
  const geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=${geocodingAPIKey}`;
  try {
    const response = await fetch(geocodingURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Geocoding location request failed:", error);
  }
}

export { getCodingLocation };

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7db4563c2bmsh3d569acf360fe8fp11270fjsnd5c4d4fc6631",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";


export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "573681bc8bb6fdda297f36fbefb6905c"; // enter your key from openweather API

