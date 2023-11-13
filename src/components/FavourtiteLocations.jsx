import React from "react"
import {getDocs, collection} from "firebase/firestore"
import {db} from "../firebase/firebase"

export default function FavouriteLocations({
  handleSavedLocationClick,
  setIsDisplayed,
  getSavedCoords
}) {
  const [favLocations, setFavLocations] = React.useState([{}])
  const handleLocationClick = (location) => {
    const {lat, lon} = JSON.parse(location.coords)
    setIsDisplayed(true)
    handleSavedLocationClick(location)
    setIsDisplayed(true)
    getSavedCoords(lat, lon)
  }
// get docs from firebase
const fetchLocations = async () => {
  await getDocs(collection(db, "locations"))
  .then((querySnapshot) =>{
        const savedLocations = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id, location: doc.data().location.replace(/^"(.*)"$/, '$1')}))
        setFavLocations(savedLocations)
  })
}
React.useEffect(() => {
  fetchLocations()
}, []);

  return (
    <div>
      <ul className="favourite-locations">
        {favLocations?.map((savedLocation, index) => (
          <li
            onClick={() => handleLocationClick(savedLocation)}
            key={index}
          >
            {savedLocation.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

