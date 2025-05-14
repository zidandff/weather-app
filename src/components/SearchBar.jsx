import { useState, useRef } from "react";
import searchIcon from "../assets/search-icon.svg";
import { fetchCitiesName } from "../http";

export default function SearchBar({ userPosition, onSelectCity }) {
  const [keyword, setKeyword] = useState("");
  const [inputIsFocus, setInputIsFocus] = useState(false);
  const [cities, setCities] = useState([]);
  const keywordInput = useRef();

  async function handleOnChange(event) {
    setKeyword(event.target.value);
    if (event.target.value.length > 0 && inputIsFocus) {
      // console.log(`mencari ${event.target.value}`);
      const cities = await fetchCitiesName(
        event.target.value,
        userPosition.lat,
        userPosition.lon
      );
      setCities(cities.data);
      console.log(cities.data);
    }
  }

  return (
    <div className="relative ">
      <div className="flex items-center py-3 px-5 min-w-[480px] w-full mb-4 glass">
        <img src={searchIcon} alt="" />
        <input
          ref={keywordInput}
          className="focus:outline-none bg-transparent text-white placeholder:text-white p-2 flex-grow"
          type="text"
          placeholder="Search other city"
          value={keyword}
          onChange={handleOnChange}
          onFocus={() => setInputIsFocus(true)}
          onBlur={() => {
            setTimeout(() => setInputIsFocus(false), 200);
          }}
        />
      </div>
      {inputIsFocus && keyword.length > 0 && (
        <ul className="min-w-[480px] w-full glass backdrop-blur-lg p-1 absolute z-10 -mt-4">
          {cities.length > 0 &&
            cities.map((city) => (
              <li key={city.id} className="border-red-500 border bg-red-500">
                <button
                  className="text-gray-200 rounded-xl py-2 px-4 hover:text-gray-50 hover:backdrop-blur-xl w-full text-left z-30 bg-blue-500"
                  onClick={() => {
                    onSelectCity(city.latitude, city.longitude);
                  }}
                >
                  {city.name}, {city.region}, {city.country}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
