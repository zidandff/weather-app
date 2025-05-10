import locationIcon from "../assets/location-icon.svg";
import weatherCloudy from "../assets/weather-cloudy.svg";

export default function WeatherCard({ weather, isLoading }) {
  console.log(weather);
  return (
    <section id="weather">
      {isLoading && <p>Getting your city...</p>}
      {weather && !isLoading && (
        <div className=" p-8 rounded-3xl glass">
          <div className="flex items-start">
            <img className="pt-1" src={locationIcon} alt="" />
            <div>
              <h1 className="block text-2xl font-medium text-[#B1DEF0]">
                {weather.name}
              </h1>
              <span className="text-base font-light text-[#B1DEF0]">12:30</span>
            </div>
          </div>

          <div className="flex items-center">
            <img src={weatherCloudy} alt="" />
            <div className="text-white">
              <h2 className="text-[80px] font-bold">
                {Math.round(weather.main.temp)}
                <span className="text-[50px] align-top">°c</span>
              </h2>
              <h2>{weather.weather[0].description}</h2>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
