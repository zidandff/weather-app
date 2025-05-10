import { useState, useRef } from "react";
import searchIcon from "../assets/search-icon.svg";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [inputIsFocus, setInputIsFocus] = useState(false);
  const keywordInput = useRef();

  function handleOnChange(event) {
    setKeyword(event.target.value);
    if (event.target.value.length > 0 && inputIsFocus) {
      console.log(`mencari ${event.target.value}`);
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
          onBlur={() => setInputIsFocus(false)}
        />
      </div>
      {inputIsFocus && keyword.length > 0 && (
        <ul className="min-w-[480px] w-full glass backdrop-blur-xl p-4 absolute z-10 -mt-4">
          <li>
            <button>Bandung</button>
          </li>
          <li>
            <button>Banjaran</button>
          </li>
          <li>
            <button>Balikpapan</button>
          </li>
          <li>
            <button>Badung</button>
          </li>
        </ul>
      )}
    </div>
  );
}
