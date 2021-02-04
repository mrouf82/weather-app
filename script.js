var DateTime = luxon.DateTime;
function setDate() {
  $(".lead").text(
    DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
  );
}
setDate();
//runs the setDate function every second so the second can be changing without an reloading the screen
var intervalID = window.setInterval(setDate, 1 * 1000);

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=b15bd32eadfe77cf8c5d312f33bcb3f8&units=imperial"
)
  .then(function (data) {
    return data.json();
  })
  .then(function (response) {
    console.log(response);
    // document.getElementById("weather").textContent = response.main.temp;
  });
