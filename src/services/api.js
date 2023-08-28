// Get current weather 

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

// Get 6 days weather 
async function getSixDaysWeather(lat, lon) {
  const apiKey = "573681bc8bb6fdda297f36fbefb6905c";
  const sixDaysWeatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=6&appid=${apiKey}`
    try {
        const response = await fetch(sixDaysWeatherURL)
        const data = await response.json()
        return data
    } catch(error){
        console.log('Weather data collection failed:', error)
        return null
    }
  }

export { getSixDaysWeather } 
/*Setting up Asyn request to load cicies while search*/

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7db4563c2bmsh3d569acf360fe8fp11270fjsnd5c4d4fc6631",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
