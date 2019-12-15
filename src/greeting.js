const jsForm = document.querySelector(".js-form");
const inputInJsForm = document.querySelector("input");
const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function init() {
  loadUserName();
}

function loadUserName() {
  let currentUserName = localStorage.getItem(USER_LS);
  if (currentUserName === null) {
    askForName();
  } else {
    paintGreeting(currentUserName);
  }
}

function askForName() {
  jsForm.classList.add(SHOWING_CN);
  jsForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();
  let userName = inputInJsForm.value;
  saveUserName(userName);
  paintGreeting(userName);
}

function saveUserName(userName) {
  localStorage.setItem(USER_LS, userName);
}

function paintGreeting(currentUserName) {
  let greeting = document.querySelector(".js-greeting");
  greeting.classList.add(SHOWING_CN);
  jsForm.classList.remove(SHOWING_CN);
  greeting.innerText = `Hello ${currentUserName}, Have a good time`;
}

init();
