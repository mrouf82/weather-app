var DateTime = luxon.DateTime;
function setDate() {
  $(".lead").text(
    DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
  );
}
setDate();
//runs the setDate function every second so the second can be changing without an reloading the screen
var intervalID = window.setInterval(setDate, 1 * 1000);

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
    // makes sure search isn't nothing
    weather(cityName);
  }
}
//api key below
var apiKey = "b15bd32eadfe77cf8c5d312f33bcb3f8";
//function to call the city by name
function weather(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (response) {
      var iconPic = response.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconPic + "@2x.png";
      // var image = document.getElementById("iconCard");
      var city = document.getElementById("city");
      // document.getElementById("city").textContent = `${cityName}`;
      // image.src = iconUrl;
      $(city).html(response.name + "<img src=" + iconUrl + ">");
      temperature.textContent = response.main.temp;
      humidity.textContent = response.main.humidity + "%";
      windspeed.textContent = response.wind.speed + "mph";
      if (response.cod == 200) {
        listCity = [];
        // listCity = JSON.parse(localStorage.getItem("places"));
        listCity.push(cityName);
        localStorage.setItem("places", JSON.stringify(listCity));
        searchHistory(cityName);
      }
      findUV(response.coord.lon, response.coord.lat);
      forcast(cityName);
    });
}
function findUV(lon, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (response) {
      console.log(response);
      var value = response.current.uvi;
      uvIndex.textContent = response.current.uvi;
      uvChange(value);
    });
}

function uvChange(value) {
  console.log(value);
  if (value < 3) {
    uvIndex.classList.remove("bg-danger");
    uvIndex.classList.remove("bg-warning");
    uvIndex.classList.add("bg-success");
    uvIndex.classList.add("text-white");
  } else if (value > 8) {
    uvIndex.classList.remove("bg-sucess");
    uvIndex.classList.remove("bg-warning");
    uvIndex.classList.add("bg-danger");
    uvIndex.classList.add("text-white");
  } else {
    uvIndex.classList.remove("bg-sucess");
    uvIndex.classList.remove("bg-danger");
    uvIndex.classList.add("bg-warning");
    uvIndex.classList.add("text-white");
  }
}
//function calls city's 5 day forcast
function forcast(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (response) {
      for (i = 0; i < 5; i++) {
        var date = new Date(
          response.list[(i + 1) * 8 - 1].dt * 1000
        ).toLocaleDateString();
        var iconcode = response.list[(i + 1) * 8 - 1].weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
        var temp = (
          (response.list[(i + 1) * 8 - 1].main.temp - 273.5) * 1.8 +
          32
        ).toFixed(2);
        var humidity = response.list[(i + 1) * 8 - 1].main.humidity;
        document.getElementById("date" + i).textContent = date;
        document.getElementById("forcastImg" + i).innerHTML =
          "<img src=" + iconurl + ">";
        document.getElementById("temp" + i).innerHTML = temp + "&#8457";
        // document.getElementById("fHumidity" + i).innerHTML = fhumidity + "%";
        document.getElementById("fHumidity" + i).textContent = humidity + "%";
      }
    });
}
//creates a list of the cities searched
function searchHistory(cityName) {
  // var ul = document.getElementsByClassName("list");
  // var li = document.createElement("li");
  // li.textContent = cityName;
  // ul.appendChild(li);
  var li = $("<li>" + cityName + "</li>");
  $(li).attr("class", "list-item");
  $(li).attr("data-value", cityName);
  $(".list").append(li);
}
document.addEventListener("click", function click(event) {
  if (event.target.matches("li")) {
    cityName = event.target.textContent;
    weather(cityName);
  }
});

window.addEventListener("load", function load() {
  var listCity = JSON.parse(localStorage.getItem("places"));
  listCity = JSON.parse(localStorage.getItem("places"));
  for (i = 0; i < listCity.length; i++) {
    searchHistory(listCity[i]);
  }
  cityName = listCity[i - 1];
});
