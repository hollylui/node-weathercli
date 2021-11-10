const axios = require("axios");
require("colors");
require("dotenv").config();

const { OPEN_WEATHER_API_KEY: weatherKey } = process.env;
const city = process.argv[2];
const unit = process.argv[3];

const tempUnit = unit === "metric" ? "°C" : "°F";

//! Current weather-------------------------------------------------------

{
  const current = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=${unit} `;

  const weatherData = async () => {
    const cityWeather = (await axios.get(current)).data;
    return cityWeather;
  };

  weatherData()
    .then((cityWeather) => {
      console.log(
        `Today is ${cityWeather.main.temp}${tempUnit} in ${cityWeather.name}.`
          .bgBrightRed
      );
      console.log(
        `The current weather conditions are: ${cityWeather.weather[0].description}.`
          .bgBrightRed
      );
    })
    .catch((err) => console.log(err));
}

//!   Bonus: forecast -------------------------------------------------------
{
  const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherKey}&units=${unit}`;

  const weatherForecast = async () => {
    const cityForecast = (await axios.get(forecast)).data.list;
    return cityForecast;
  };

  const getForecast = (cityForecast) => {
    cityForecast.map((eachDay) => {
      const date = eachDay.dt_txt;
      const hour = new Date(date).getHours();

      if (hour === 0) {
        console.log(
          `Date: ${eachDay.dt_txt.slice(0, 10)} --------------`.black.bgGreen
        );
        console.log(`Temperature: ${eachDay.main.temp}${tempUnit}`);
        console.log(`Forecast: ${eachDay.weather[0].description}`);
      }
    });
  };

  weatherForecast()
    .then((cityForecast) => getForecast(cityForecast))
    .catch((err) => console.log(err));
}
