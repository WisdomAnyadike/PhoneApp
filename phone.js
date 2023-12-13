let passwordScreen = document.getElementById("password");
let passwordInput = document.getElementById("passwordInput");
let homeScreen = document.getElementById("homeScreen");
let time = document.getElementById("time");
let dateString = document.getElementById("datestring");
let wallpaper = document.getElementById("wallpaper");
let text = document.getElementById("text");
let callPage = document.getElementById("callPage");
let buttonDelete = document.getElementById("buttonDelete");

localStorage.setItem("password", "8950");

homeScreen.style.visibility = "visible";

function onPhone() {
  homeScreen.style.visibility == "visible"
    ? (homeScreen.style.visibility = "hidden")
    : (homeScreen.style.visibility = "visible");
  wallpaper.style.visibility = "visible";
  passwordScreen.style.visibility = "visible";
  callPage.style.zIndex = -1;
  rechargeCard.style.zIndex = -1;
  alarmPage.style.zIndex = -1;
  videoPage.style.zIndex = -1;
  displayPictures.style.zIndex = -1;
  musicPage.style.zIndex = -1;
  contactsPage.style.zIndex = -1;
}

function makeTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = `${minutes}`;
  }

  let currentTime = `${hours}:${minutes}`;

  if (hours < 10) {
    currentTime = `0${hours}:${minutes}AM`;
  } else if (hours < 12) {
    currentTime = `${hours}:${minutes}AM`;
  } else {
    currentTime = `${hours}:${minutes}  PM`;
  }

  return currentTime;
}
setInterval(() => {
  let date = new Date().toDateString();
  dateString.innerHTML = date;
  time.innerHTML = makeTime();
}, 1000);

function openPhone() {
  wallpaper.style.visibility = "hidden";
}

let theButtons = document.querySelectorAll(".button");
theButtons.forEach((button) => {
  button.style.fontWeight = "600";
  button.style.color = "white";
  button.style.fontSize = "20px";
  button.style.backgroundColor = "rgba(0, 0, 0, 0.207)";
  button.style.border = "none";
});

let theButtonss = document.querySelectorAll(".butto");
theButtonss.forEach((button) => {
  button.style.fontWeight = "600";
  button.style.color = "white";
  button.style.fontSize = "20px";
  button.style.backgroundColor = "#333333";
  button.style.border = "none";
});

buttonDelete.style.visibility = "hidden";
function addCallNum(num) {
  callInput.value += num;
  if (callInput.value.length > 0) {
    buttonDelete.style.visibility = "visible";
  }
}

function addNum(val) {
  passwordInput.value += val;

  if (passwordInput.value.length == 4) {
    passwordInput.value = passwordInput.value;
    if (passwordInput.value == localStorage.getItem("password")) {
      passwordScreen.style.visibility = "hidden";
      passwordInput.value = "";
    } else {
      text.innerHTML = "Try again";
      passwordInput.value = "";
    }
  } else if (passwordInput.value.length < 4) {
    text.innerHTML = `Swipe up for Face ID of <br> Enter Password `;
  } else {
    passwordInput.value = "";
  }
}

function deleteItem() {
  passwordInput.value = passwordInput.value.slice(0, -1);
}

function callDeleteNum() {
  callInput.value = callInput.value.slice(0, -1);
  if (callInput.value.length == 0) {
    buttonDelete.style.visibility = "hidden";
  }
}

callPage.style.zIndex = -1;

function showCallPage() {
  callPage.style.zIndex = 20;
  contactsPage.style.zIndex = -1;
}

function backPage() {
  callPage.style.zIndex = -1;
  rechargeCard.style.zIndex = -1;
  alarmPage.style.zIndex = -1;
  videoPage.style.zIndex = -1;
  displayPictures.style.zIndex = -1;
  musicPage.style.zIndex = -1;
  contactsPage.style.zIndex = -1;
}

