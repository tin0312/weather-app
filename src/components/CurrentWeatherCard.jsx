import React, { useState, useEffect } from "react"
import { formattedDate } from "../utils/dateUtils"
import {
  getDocs,
  query,
  where,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "../firebase/firebase"
import * as weatherIcon from "../assets"

export default function CurrentWeatherCard({
  currentWeather,
  tempUnit,
  locationName,
  searchCoords,
}) {
  const { weather, temp, name, time_stamp } = currentWeather
  const date = formattedDate(time_stamp);
  const weatherIcons =
    weather === "Clear"
      ? weatherIcon.clearIcon
      : weather === "Clouds" && weather.description === "few clouds"
      ? weatherIcon.lightCloudIcon
      : weather === "Clouds" && weather.description === "overcast clouds"
      ? weatherIcon.heavyCloudIcon
      : weather === "Clouds"
      ? weatherIcon.lightCloudIcon
      : weather === "Rain" && currentWeather.description === "light rain"
      ? weatherIcon.lightRainIcon
      : weather === "Rain" && currentWeather.description === "very heavy rain"
      ? weatherIcon.heavyRainIcon
      : weather === "Rain" && currentWeather.description === "shower rain"
      ? weatherIcon.showerIcon
      : weather === "Rain"
      ? weatherIcon.heavyRainIcon
      : weather === "Snow"
      ? weatherIcon.snowIcon
      : weather === "Snow" && currentWeather.description === "sleet"
      ? weatherIcon.sleetIcon
      : weather === "Thunderstorm"
      ? weatherIcon.thunderstormIcon
      : "";

  // Initialize location and locationId
  const favLocation = JSON.stringify(locationName);
  const favCoords = JSON.stringify(searchCoords);
  const [isPinned, setIsPinned] = useState(false)

  // save fav locations in Firestore
  const toggleSavePlaces = async () => {
    if (favLocation !== "") {
      // Check if locationName is not an empty string
      const locationQuery = query(
        collection(db, "locations"),
        where("location", "==", favLocation)
      )
      try {
        const querySnapshot = await getDocs(locationQuery)
        // if doc id is not present and unique
        if (querySnapshot.size === 0) {
          // add in firestore
          await addDoc(collection(db, "locations"), {
            location: favLocation,
            coords: favCoords,
          })
          setIsPinned(true)
        } else {
          //remove the item from firestore
          querySnapshot.forEach(async (docSnapShot) => {
            const docRef = doc(db, "locations", docSnapShot.id)
            await deleteDoc(docRef)
          })
          setIsPinned(false)
        }
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }
  }
  return (
    <div className="current-weather-display">
      <div className="current-weather-card">
        <img src={weatherIcons} alt="weather-icon" />
        <h1 className="current-temperature">
          {temp} <span>{tempUnit === "Celsius" ? "°C" : "°F"}</span>
        </h1>
        <h2 className="current-weather-condition">{weather}</h2>
      </div>
      <div className="current-date-container">
        <h3 className="date">
          <pre>{`Today • ${date}`}</pre>
        </h3>
        <h3 className="current-location">
          <span
            onClick={toggleSavePlaces}
            className={`${
              isPinned
                ? "material-symbols-outlined pinned-icon"
                : "material-symbols-outlined location"
            }`}
          >
            {" "}
            {isPinned ? "pin_drop" : "location_on"}
          </span>

          {name}
        </h3>
      </div>
    </div>
  )
}
