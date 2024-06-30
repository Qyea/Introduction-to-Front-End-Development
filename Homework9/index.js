const getWeather = () => {
  const userInputElement = document.getElementById("user-input");
  const city = userInputElement.value;
  const wetherIconElement = document.getElementById("weather-icon");
  const errorMessageElement = document.getElementById("error-message");
  const errorMessage = "Something went wrong! Try again a little bit later";

  const API_KEY = "197dafdade01d3e785aecdfc076fbc89";

  if (!city) {
    errorMessageElement.textContent = errorMessage;
  }

  errorMessageElement.textContent = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error();
      }
    })
    .then((data) => {
      const iconCode = data.weather[0].icon;
      return fetch(`https://openweathermap.org/img/wn/${iconCode}@4x.png`);
    })
    .then((response) => {
      if (response.ok) {
        return response.url;
      } else {
        throw Error();
      }
    })
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
