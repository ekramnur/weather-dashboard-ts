import {
  getCoordinates,
  getWeather
} from "./api.js";

import {
  renderCurrentWeather,
  renderForecast,
  renderLoading,
  renderError,
  renderIdle
} from "./render.js";

const cityInput =
  document.getElementById("cityInput") as HTMLInputElement | null;

const searchBtn =
  document.getElementById("searchBtn") as HTMLButtonElement | null;

async function searchWeather(): Promise<void> {
  if (!cityInput) {
    return;
  }

  const city: string = cityInput.value.trim();

  if (!city) {
    renderError("Please enter a city name.");
    return;
  }

  try {
    renderLoading();

    const location = await getCoordinates(city);

    const weather = await getWeather(
      location.latitude,
      location.longitude
    );

    renderCurrentWeather(
      location,
      weather
    );

    renderForecast(weather);
  } catch (error: unknown) {
    if (error instanceof Error) {
      renderError(error.message);
    } else {
      renderError("Something went wrong.");
    }
  }
}

if (searchBtn) {
  searchBtn.addEventListener(
    "click",
    (): void => {
      void searchWeather();
    }
  );
}

if (cityInput) {
  cityInput.addEventListener(
    "keydown",
    (event: KeyboardEvent): void => {
      if (event.key === "Enter") {
        void searchWeather();
      }
    }
  );
}

renderIdle();