import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { fetchCurrentWeather } from "./http";

function App() {
  const [currentWeather, setCurrentWeather] = useState();
  const [userCoords, setUserCoords] = useState({ lat: null, lon: null });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      setIsFetching(true);
      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const weather = await fetchCurrentWeather(
          position.coords.latitude,
          position.coords.longitude
        );
        setCurrentWeather(weather);
        setUserCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchWeather();
  }, []);

  async function handleSelectCityWeather(lat, lon) {
    console.log("heloo");
    setIsFetching(true);
    try {
      const weather = await fetchCurrentWeather(lat, lon);
      setCurrentWeather(weather);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="flex items-center w-fit mx-auto flex-col mt-[100px]">
      <SearchBar
        userPosition={userCoords}
        onSelectCity={handleSelectCityWeather}
      />
      <WeatherCard isLoading={isFetching} weather={currentWeather} />
    </div>
  );
}

export default App;
