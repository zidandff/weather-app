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

export async function fetchCitiesName(keyword, lat, lon) {
  let location = "";

  if (lat !== null && lon !== null) {
    const latStr = lat >= 0 ? `%2B${lat}` : `${lat}`;
    const lonStr = lon >= 0 ? `%2B${lon}` : `${lon}`;
    location = `&location=${latStr}${lonStr}`;
  }
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${keyword}${location}`;
  console.log(url);
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9bc9e8f0a9mshc065a8830fdceb7p1319e5jsnfe93945131f8",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch city data");
  }

  if (responseData.data.length == 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const fallback = await fetchCitiesName(keyword, null, null);
    return fallback;
  }

  return responseData;
}
