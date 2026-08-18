import type { Geo, WeatherResponse } from "./types.js";

const GEO_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast";

interface GeoResponse {
  results?: Geo[];
}

export async function getCoordinates(
  city: string
): Promise<Geo> {
  const response = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(city)}&count=1`
  );

  if (!response.ok) {
    throw new Error("Failed to find city.");
  }

  const data: GeoResponse = await response.json();

  const result: Geo | undefined =
    data.results?.[0];

  if (!result) {
    throw new Error("City not found.");
  }

  return result;
}

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  const url =
    `${WEATHER_URL}?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&forecast_days=5` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to get weather data.");
  }

  const data: WeatherResponse =
    await response.json();

  return data;
}