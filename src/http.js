export async function fetchCurrentWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=73f072a701ccb036d40ef73964844b7f`
  );
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return responseData;
}
