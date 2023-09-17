import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { loadAllCities } from "../services/api";

const LocationSearch = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const loadOptions = async (searchData) => {
    const allCities = await loadAllCities(searchData);
    return allCities;
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  return (
    <AsyncPaginate
      className="search-bar"
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default LocationSearch;
