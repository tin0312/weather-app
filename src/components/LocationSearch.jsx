import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { loadAllCities } from "../services/api";

const LocationSearch = ({
  onSearchChange,
  isOpenned,
  handleFavDropdown,
  closeFavDropDown,
  searchWindow,
  setSearchWindow,
}) => {
  const [search, setSearch] = useState(null);
  const loadOptions = async (searchData) => {
    const allCities = await loadAllCities(searchData);
    return allCities;
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData)
  };
  const handleOnFocus = () => {
    setSearchWindow(true);
  };
  const handleSearch = () => {
    onSearchChange(search);
    setSearchWindow(false);
    setSearch(null)
  };
  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isFocused ? "#1e213a" : "#6E707A",
      border: state.isFocused ? "1px solid #E7E7EB" : "none",
      borderRadius: "0",
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      color: "#E7E7EB",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "#E7E7EB",
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isFocused ? "#616475" : "#E7E7EB",
      display: "flex",
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      color: "#E7E7EB",
      backgroundColor: "#1e213a",
      cursor: "pointer",
    }),
  };
  return (
    <div className="search-bar-container">
      <AsyncPaginate
        styles={customStyles}
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        onFocus={handleOnFocus}
        placeholder={
          <span>
            {searchWindow && (
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "1.5em" }}
              >
                search
              </span>
            )}
            Search for places
          </span>
        }
      />
      {searchWindow ? (
        <button onClick={handleSearch}>Search</button>
      ) : !isOpenned ? (
        <span
          onClick={handleFavDropdown}
          className="material-symbols-outlined saved-location"
        >
          share_location
        </span>
      ) : (
        <span
          onClick={closeFavDropDown}
          className="material-symbols-outlined saved-location"
        >
          saved_search
        </span>
      )}
    </div>
  );
};

export default LocationSearch;
