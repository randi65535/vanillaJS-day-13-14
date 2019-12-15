const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const toDoneList = document.querySelector(".js-toDoneList");
const TODOS_LocalStorage = "toDos";
const TODONES_LocalStorage = "toDones";

let toDos = [];
let toDones = [];

function init() {
  loadToDos();

  toDoForm.addEventListener("submit", handleSubmit);
}

init();

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LocalStorage);
  if (loadedToDos !== null) {
    let parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }

  const loadedToDones = localStorage.getItem(TODONES_LocalStorage);
  if (loadedToDones !== null) {
    let parsedToDones = JSON.parse(loadedToDones);
    parsedToDones.forEach(function(toDone) {
      paintToDone(toDone.text);
    });
  }

  saveApp();
}

function handleSubmit(event) {
  event.preventDefault();
  let currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function paintToDo(text) {
  let li = document.createElement("li");
  let newId = uuidv4();
  li.id = newId;

  let delBtn = document.createElement("button");
  delBtn.innerText = "✂";
  delBtn.addEventListener("click", deleteToDo);

  let doneBtn = document.createElement("button");
  doneBtn.innerText = "✔";
  doneBtn.addEventListener("click", doneToDo);

  let span = document.createElement("span");
  span.innerText = text + " ";

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);

  toDoList.appendChild(li);

  let toDoObj = {
    id: newId,
    text: text
  };

  toDos.push(toDoObj);
}

function paintToDone(text) {
  let li = document.createElement("li");
  let newId = uuidv4();
  li.id = newId;

  let delBtn = createButtonElement("✂", deleteToDo);
  let redoBtn = createButtonElement("🍃", redoToDo);
  let span = document.createElement("span");
  span.innerText = text + " ";

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(redoBtn);

  toDoneList.appendChild(li);

  let toDoneObj = {
    id: newId,
    text: text
  };

  toDones.push(toDoneObj);
}

function saveApp() {
  localStorage.setItem(TODOS_LocalStorage, JSON.stringify(toDos));
  localStorage.setItem(TODONES_LocalStorage, JSON.stringify(toDones));
}

function doneToDo(event) {
  let btn = event.target;
  let li = btn.parentNode;

  let toDone = {};
  toDone.id = li.id;
  toDone.text = parseInnerText(li.innerText);

  toDones.push(toDone);

  li.removeChild(btn);

  let reduceToDos = toDos.filter(toDo => {
    return toDo.id !== li.id;
  });

  toDos = reduceToDos;

  let redoBtn = createButtonElement("🍃", redoToDo);
  li.appendChild(redoBtn);

  toDoList.removeChild(li);
  toDoneList.appendChild(li);

  saveApp();
}

function redoToDo(event) {
  let btn = event.target;
  let li = btn.parentNode;
  let toDo = {};
  toDo.id = li.id;
  toDo.text = parseInnerText(li.innerText);

  toDos.push(toDo);

  let reduceToDones = toDones.filter(toDone => {
    return toDone.id !== li.id;
  });
  toDones = reduceToDones;

  li.removeChild(btn);

  let doneBtn = createButtonElement("✔", doneToDo);
  li.appendChild(doneBtn);

  toDoneList.removeChild(li);
  toDoList.appendChild(li);

  saveApp();
}

function createButtonElement(innerText, callback) {
  let btn = document.createElement("button");
  btn.innerText = innerText;
  btn.addEventListener("click", callback);
  return btn;
}

function parseInnerText(str) {
  return str.slice(0, str.length - 3);
}

function deleteToDo(event) {
  let btn = event.target;
  let li = btn.parentNode;
  let ul = li.parentNode;

  if (ul.className === "js-toDoList") {
    toDoList.removeChild(li);

    let reduceToDos = toDos.filter(toDo => {
      return toDo.id !== li.id;
    });

    toDos = reduceToDos;
  } else {
    toDoneList.removeChild(li);

    let reduceToDones = toDos.filter(toDone => {
      return toDone.id !== li.id;
    });

    toDones = reduceToDones;
  }

  saveApp();
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
