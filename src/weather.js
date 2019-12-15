var weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEY = "d619f0665191beec398021d51c06df5a";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      let temperature = json.main.temp;
      let place = json.name;

      console.log(weather);
      console.log(temperature, place);
      weather.innerText = `${temperature}℃ @${place}`;
    });
}

function init() {
  loadCoords();
}

function loadCoords() {
  let loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    let parsedCoords = JSON.parse(loadedCoords);
    console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(
    handleLoadGeoSuccess,
    handleLoadGeoFail
  );
}

function handleLoadGeoSuccess(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleLoadGeoFail() {
  console.log("위치 정보를 읽을 수 없습니다.");
}

init();
