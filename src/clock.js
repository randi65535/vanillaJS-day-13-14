const clockTime = document.querySelector(".js-clock-time");

function init() {
  setInterval(getTime, 1000);
}

function getTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let result = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  clockTime.innerText = result;
}

init();
