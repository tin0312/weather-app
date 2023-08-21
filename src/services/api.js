/*
Task1: Pulling API to fill this form 

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

async function getCurrentWeather(){
      const currrentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=43.6534817&lon=-79.3839347&appid=573681bc8bb6fdda297f36fbefb6905c"
      try {
        const response = await fetch(currrentWeatherURL)
        const data = await response.json()
        return data
      } catch(error) {
        console.log("Weather data collection failed:", error)
        return null
      }
}

export { getCurrentWeather }

/*



Task 2: Fetching data for 5 days in the future 

-Source: Daily Forecast 16 days

*/



