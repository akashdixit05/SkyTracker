const apiKey = "9a96dc8e688b3e1158cc5ae5a56fd03a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".Weather-icon");
const weatherCard = document.querySelector(".Weather");
const cityElem = document.querySelector(".city");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      // City not found (404 or other error)
      cityElem.innerHTML = "❌ City not found";
      document.querySelector(".temp").innerHTML = "--°C";
      document.querySelector(".humidity").innerHTML = "--%";
      document.querySelector(".wind").innerHTML = "-- kmph";
      weatherIcon.src = "assets/weatherpng/error.png"; // optional error icon
      weatherCard.style.display = "block";
      return;
    }

    const data = await response.json();
    console.log(data);

    cityElem.innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    const weatherMain = data.weather[0].main.toLowerCase();
    if (weatherMain === "clouds") {
      weatherIcon.src = "assets/weatherpng/clouds.png";
    } else if (weatherMain === "rain") {
      weatherIcon.src = "assets/weatherpng/rain.png";
    } else if (weatherMain === "snow") {
      weatherIcon.src = "assets/weatherpng/snow.png";
    } else if (weatherMain === "clear") {
      weatherIcon.src = "assets/weatherpng/clear.png";
    } else if (weatherMain === "sun") {
      weatherIcon.src = "assets/weatherpng/sun.png";
    } else {
      weatherIcon.src = "assets/weatherpng/error.png"; // fallback
    }

    weatherCard.style.display = "block";
  } catch (error) {
    console.error("Error fetching weather:", error);
    cityElem.innerHTML = "⚠️ Network error";
    weatherCard.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchbox.value.trim());
});
