const responseSuccess = (type) => (response) => {
  if (response.ok) {
    switch (type) {
      case "url":
        return response.url;
      default:
        return response.json();
    }
  } else {
    throw Error();
  }
};

const getWeather = () => {
  const userInputElement = document.getElementById("user-input");
  const city = userInputElement.value;
  const wetherIconElement = document.getElementById("weather-icon");
  const weatherTempElement = document.getElementById("weather-temp");
  const weatherCityElement = document.getElementById("weather-city");
  const weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  const weatherHumidityIconElement = document.getElementById(
    "weather-humidity-icon"
  );
  const weatherWindIconElement = document.getElementById("weather-wind-icon");
  const weatherHumidityElement = document.getElementById("weather-humidity");
  const weatherWindElement = document.getElementById("weather-wind");

  const errorMessageElement = document.getElementById("error-message");
  const errorMessage = "Something went wrong! Try again a little bit later";

  const reset = () => {
    errorMessageElement.textContent = "";

    wetherIconElement.setAttribute("src", "");
    wetherIconElement.setAttribute("alt", "");

    weatherHumidityIconElement.setAttribute("src", "");
    weatherHumidityIconElement.setAttribute("alt", "");
    weatherHumidityElement.textContent = "";

    weatherWindIconElement.setAttribute("src", "");
    weatherWindIconElement.setAttribute("alt", "");
    weatherWindElement.textContent = "";
  };

  const displayWeather = (data) => {
    // Temperature
    const temperature = Math.round(data.main.temp - 273.15);
    weatherTempElement.innerHTML = `${temperature}&deg;C`;
    weatherCityElement.innerHTML = data.name;
    weatherDescriptionElement.innerHTML =
      data.weather[0].description[0].toUpperCase() +
      data.weather[0].description.slice(1);

    // Humidity
    weatherHumidityIconElement.setAttribute(
      "src",
      "https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
    );
    weatherHumidityIconElement.setAttribute("alt", "Humidity icon");
    weatherHumidityElement.textContent = `${data.main.humidity}`;

    // Wind
    weatherWindIconElement.setAttribute(
      "src",
      "https://www.svgrepo.com/show/532896/wind.svg"
    );
    weatherWindIconElement.setAttribute("alt", "Wind icon");
    weatherWindElement.textContent = `${Math.round(data.wind.speed)} m/s`;
  };

  reset();

  if (!city) {
    errorMessageElement.textContent = errorMessage;
    return;
  }

  const API_KEY = "197dafdade01d3e785aecdfc076fbc89";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then(responseSuccess("json"))
    .then((data) => {
      displayWeather(data);
      const iconCode = data.weather[0].icon;

      return fetch(`https://openweathermap.org/img/wn/${iconCode}@4x.png`);
    })
    .then(responseSuccess("url"))
    .then((iconUrl) => {
      wetherIconElement.setAttribute("src", iconUrl);
      wetherIconElement.setAttribute("alt", "Wether Icon");
    })
    .catch((e) => {
      const popupElement = document.createElement("div");

      popupElement.setAttribute(
        "class",
        "d-flex align-items-center position-fixed top-0 start-50 mt-5 translate-middle p-2 bg-danger-subtle border border-danger rounded text-danger"
      );

      popupElement.textContent = errorMessage;

      document.body.appendChild(popupElement);

      setTimeout(() => {
        if (popupElement.parentNode !== null) {
          popupElement.parentNode.removeChild(popupElement);
        }
      }, 3000);

      errorMessageElement.textContent = errorMessage;
      console.error(e);
    });
};
