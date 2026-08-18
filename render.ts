import type { Geo, WeatherResponse } from "./types.js";

function getWeatherDescription(code: number): string {
  if (code === 0) {
    return "Clear sky";
  }

  if (code === 1 || code === 2 || code === 3) {
    return "Partly cloudy";
  }

  if (code === 45 || code === 48) {
    return "Foggy";
  }

  if (code >= 51 && code <= 57) {
    return "Drizzle";
  }

  if (code >= 61 && code <= 67) {
    return "Rain";
  }

  if (code >= 71 && code <= 77) {
    return "Snow";
  }

  if (code >= 80 && code <= 82) {
    return "Rain showers";
  }

  if (code >= 95) {
    return "Thunderstorm";
  }

  return "Unknown weather";
}

export function renderCurrentWeather(
  location: Geo,
  weather: WeatherResponse
): void {
  const currentWeather = document.getElementById("currentWeather");

  if (!currentWeather) {
    return;
  }

  const temperature =
    weather.current.temperature_2m;

  const windSpeed =
    weather.current.wind_speed_10m;

  const weatherCode =
    weather.current.weather_code;

  currentWeather.innerHTML = `
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800">
        ${location.name}, ${location.country}
      </h2>

      <p class="text-gray-500 mt-1">
        ${getWeatherDescription(weatherCode)}
      </p>

      <div class="text-5xl font-bold text-blue-600 mt-4">
        ${temperature}°C
      </div>

      <p class="text-gray-600 mt-3">
        💨 Wind: ${windSpeed} km/h
      </p>
    </div>
  `;
}

export function renderForecast(
  weather: WeatherResponse
): void {
  const forecastContainer =
    document.getElementById("forecast");

  if (!forecastContainer) {
    return;
  }

  forecastContainer.innerHTML = weather.daily.time
    .map((date: string, index: number) => {
      const max =
        weather.daily.temperature_2m_max[index];

      const min =
        weather.daily.temperature_2m_min[index];

      const code =
  weather.daily.weather_code[index] ?? 0;

      return `
        <div class="bg-white rounded-2xl shadow-md p-5">
          <h3 class="font-bold text-gray-800">
            ${date}
          </h3>

          <p class="text-gray-500 mt-2">
            ${getWeatherDescription(code)}
          </p>

          <p class="text-xl font-bold text-blue-600 mt-3">
            ${max}°C
          </p>

          <p class="text-gray-500">
            Low: ${min}°C
          </p>
        </div>
      `;
    })
    .join("");
}

export function renderLoading(): void {
  const status = document.getElementById("status");

  if (status) {
    status.textContent = "Loading weather...";
  }
}

export function renderError(message: string): void {
  const status = document.getElementById("status");

  if (status) {
    status.textContent = message;
  }
}

export function renderIdle(): void {
  const status = document.getElementById("status");

  if (status) {
    status.textContent = "Search for a city to see the weather.";
  }
}