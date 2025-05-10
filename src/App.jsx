import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [currentWeather, setCurrentWeather] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsFetching(true);
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=73f072a701ccb036d40ef73964844b7f`
        );
        const responseData = await response.json();
        setCurrentWeather(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchWeather();
  }, []);
  return (
    <div className="flex items-center w-fit mx-auto flex-col mt-[100px]">
      <SearchBar />
      <WeatherCard isLoading={isFetching} weather={currentWeather} />
    </div>
  );
}

export default App;
