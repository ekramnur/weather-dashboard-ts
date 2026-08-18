export interface Geo {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Current {
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface Daily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherResponse {
  current: Current;
  daily: Daily;
}