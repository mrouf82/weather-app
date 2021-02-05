var DateTime = luxon.DateTime;
function setDate() {
  $(".lead").text(
    DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
  );
}
setDate();
//runs the setDate function every second so the second can be changing without an reloading the screen
var intervalID = window.setInterval(setDate, 1 * 1000);
var iconCard = document.getElementById("iconCard");
var displayCity = document.getElementById("inputed-city");
var temperature = document.getElementById("temperature");
var humidity = document.getElementById("humidity");
var windspeed = document.getElementById("wind-speed");
var uvIndex = document.getElementById("uv-index");
var listCity = [];

//integrating the searched city to a value
var form = document.querySelector("#searchForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityName = form.elements.input.value;
  display(cityName);
});

function display(cityName) {
  if (cityName !== "") {
    weather(cityName);
  }
}
var proxy = "http://cors-anywhere.herokuapp.com/";
var apiKey = "b15bd32eadfe77cf8c5d312f33bcb3f8";
function weather(cityName) {
  fetch(
    `${proxy}api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (response) {
      var iconPic = response.weather[0].icon;
      var iconUrl = `http://openweathermap.org/img/wn/${iconPic}@2x.png`;
      document.getElementById("city").textContent = `${cityName}`;
      $(iconCard).html("<img src=" + iconUrl + ">");
    });
}
// ${response.main.temp}  F
