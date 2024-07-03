//creating 'weather' object that contains methods/properties related to fetching information
let weather = {
    apiKey: "2887513c3833c48215fbb4bb2f4cf82a", //API key from OpenWeatherMap 
    fetchWeather: function (city) {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
          city + "&units=metric&appid=" + this.apiKey)  //API URL
        .then((response) => 
          {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found."); }  //displaying 'ERROR' message if information not found
          return response.json();  //converting response to JSON 
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      //updating with the fetched data
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
    },
    //fetching search input value
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  //adding 'click' event listener to trigger "search" method
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  //pressing 'Enter' also triggers "search" method
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  //by default Islamabad's weather is fetched
  weather.fetchWeather("Islamabad");
  