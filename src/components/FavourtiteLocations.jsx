import React from "react";

export default function FavouriteLocations({ favLocations }) {
    console.log(favLocations)
  return (
    <div className="favourite-locations">
      <ul>
        {favLocations.map((favLocation, index) => (
          <li key={index}>{favLocation}</li>
        ))}
      </ul>
    </div>
  );
}
