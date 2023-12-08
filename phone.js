let passwordScreen = document.getElementById("password");
let passwordInput = document.getElementById("passwordInput");
let homeScreen = document.getElementById("homeScreen");
let time = document.getElementById("time");
let dateString = document.getElementById("datestring");
let wallpaper = document.getElementById("wallpaper");
let text = document.getElementById("text");
let callPage = document.getElementById("callPage");
let buttonDelete = document.getElementById("buttonDelete");
let rechargeCard = document.getElementById("rechargeCard");
let balMTN = document.getElementById("balMTN");
let displayBalance = document.getElementById("displayBalance");

let timee = document.getElementById("timee");
let alarms = [];
let alarmHtml = document.getElementById("alarm");
let alarmAudio = new Audio("iPhone-Alarm-Original.mp3");
let alarmPage = document.getElementById("alarmPage");
let videoPage = document.getElementById('videoPage')

let imgs =  JSON.parse(localStorage.getItem('images')) || []

let provider = document.getElementById("provider");
let amount = document.getElementById("amount");
let pin = "";
let allPins = [];
let MtnBalance = JSON.parse(localStorage.getItem("theBalance"));
//   localStorage.removeItem('theBalance')
MtnBalance = 0 + MtnBalance;
let AirtelBalance = 0;
let gottenPin = JSON.parse(localStorage.getItem("card"));
let callInput = document.getElementById("callInput");
balMTN.innerHTML = MtnBalance;

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
  videoPage.style.zIndex = -1
  displayPictures.style.zIndex = -1
  musicPage.style.zIndex = -1
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
}

function backPage() {
  callPage.style.zIndex = -1;
  rechargeCard.style.zIndex = -1;
  alarmPage.style.zIndex = -1;
  videoPage.style.zIndex = -1
  displayPictures.style.zIndex = -1
  musicPage.style.zIndex = -1
}

function genAirtime() {
  let small = document.getElementById("smalltext");
  small.style.fontSize = "10px";
  for (let index = 0; index < 10; index++) {
    let rand = Math.floor(Math.random() * 10);
    pin += rand;
    console.log(rand);
  }
  console.log(pin);
  let card = {
    pin: pin,
    used: false,
    provider: provider.value,
    amount: Number(amount.value),
  };
  if (card.provider == "" || card.amount == "") {
    small.innerHTML = "Make sure you've picked a Provider & Amount";
  } else if (gottenPin == null) {
    small.innerHTML = "";
    gottenPin = [];
    gottenPin.push(card);
    localStorage.setItem("card", JSON.stringify(gottenPin));
    dispCards();
    pin = "";
  } else {
    small.innerHTML = "";
    gottenPin.push(card);
    localStorage.setItem("card", JSON.stringify(gottenPin));
    dispCards();
    pin = "";
  }
}
console.log(gottenPin);

function dispCards() {
  n = 0;
  tbody.innerHTML = "";
  gottenPin.forEach((el, i) => {
    document.getElementById("tbody").innerHTML += `
                <tr>
                    <td >
                        <input id="copied${i}" value="${el.pin}" /> 
                        <button onclick="copyPin(${i})"> <iconify-icon id='iconcolor${i}' icon="bxs:copy" style="color: #000;" width="16"></iconify-icon>  </button>   
                    </td>
                    <td>${el.used}</td>
                    <td>${el.provider}</td>
                    <td>${el.amount}</td>
                    
                </tr>`;
  });
}

dispCards();

function CallNum() {
  let showCallBal = document.getElementById("showingBal");
  let loadedAirtime = String(callInput.value).trim();
  let pattern = /^[*]{1}[3]{1}[1]{2}[*]{1}[0-9]{10}[#]{1}$/;

  let found = gottenPin.find((el) => el.pin == loadedAirtime.slice(5, 15));
  console.log(found);
  if (!found) {
    showCallBal.innerHTML = `   <p style="margin-top: 15px;"> Invalid pin </p>
    <button onclick="remove()"> Ok </button>  `;
    displayBalance.style.zIndex = 22;
    callInput.value = "";
    return;
  } else if (!pattern.test(loadedAirtime)) {
    showCallBal.innerHTML = ` <p style="margin-top: 15px;">  Invalid format </p>
        <button onclick="remove()"> Ok </button>   `;
    displayBalance.style.zIndex = 22;
    callInput.value = "";
    return;
  } else if (
    found.provider == "Airtel" ||
    found.provider == "9mobile" ||
    found.provider == "Glo"
  ) {
    showCallBal.innerHTML = ` <p style="margin-top: 15px;">  Invalid network </p>
    <button onclick="remove()"> Ok </button>   `;
    displayBalance.style.zIndex = 22;
    callInput.value = "";
    return;
  } else if (found.used == true) {
    showCallBal.innerHTML = `   <p style="margin-top: 15px;">  Airtime has already been used </p>
    <button onclick="remove()"> Ok </button>  `;
    displayBalance.style.zIndex = 22;
    callInput.value = "";
    return;
  } else if (pattern.test(loadedAirtime) && found.provider == "MTN") {
    found.used = true;
    localStorage.setItem("card", JSON.stringify(gottenPin));
    MtnBalance += Number(found.amount);
    localStorage.setItem("theBalance", JSON.stringify(MtnBalance));
    balMTN.innerHTML = MtnBalance;
    dispCards();
    displayBalance.style.zIndex = 22;
    callInput.value = "";
  } else {
    showCallBal.innerHTML = `   <p style="margin-top: 15px;"> Invalid code </p>
    <button onclick="remove()"> Ok </button>  `;
    displayBalance.style.zIndex = 22;
    callInput.value = "";
    return;
  }
}

async function copyPin(i) {
  let pinVal = document.getElementById(`copied${i}`).value;
  let copyText = document.getElementById(`copied${i}`);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  await navigator.clipboard.writeText(pinVal);
  document.getElementById(`iconcolor${i}`).style.color = "grey";
}

function showRechargeApp() {
  rechargeCard.style.zIndex = 22;
}

function remove() {
  displayBalance.style.zIndex = -1;
}
//   localStorage.removeItem('card')

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
  timee.innerHTML = makeTime();
}, 1000);

function setAlarm() {
  const timeInput = document.getElementById("timeInput");

  const date = new Date();

  let alarm = {
    now: new Date(
      date.toDateString() +
        " " +
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    ),
    alarmTime: new Date(date.toDateString() + " " + timeInput.value),
    timeInput: timeInput.value,
    timeBeforeAlarm: function () {
      return this.alarmTime - this.now;
    },
    alarmRang: false,
  };

  alarms.push(alarm);
  console.log(alarms);

  display();

  if (alarm.timeBeforeAlarm() > 0) {
    setTimeout(() => {


      setTimeout(() => {
        alarmAudio.play();
      }, 3000);

      // setTimeout(() => {
      //   let alarmPrompt = prompt("snooze", "yes or no");
      //   if (alarmPrompt.trim() == "yes") {
      //     alarmAudio.pause();
      //     const date = new Date();

      //     let alarm = {
      //       now: new Date(
      //         date.toDateString() +
      //           " " +
      //           `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      //       ),
      //       alarmTime: new Date(
      //         date.toDateString() +
      //           " " +
      //           `${date.getHours()}:${
      //             date.getMinutes() + 5
      //           }:${date.getSeconds()}`
      //       ),
      //       timeInput: `${date.getHours()}:${
      //         date.getMinutes() + 5
      //       }:${date.getSeconds()}`,
      //       timeBeforeAlarm: function () {
      //         return this.alarmTime - this.now;
      //       },
      //       alarmRang: false,
      //     };

      //     alarms.push(alarm);
      //     console.log(alarms);
      //     alarmHtml.innerHTML += `<p id='alarm'> You've snoozed an alarm to ${alarm.timeInput}  </p>`;
      //   } else if (alarmPrompt.trim() == "no") {
      //     playAudio();
      //   } else {
      //     alert("invalid input");
      //   }
      // }, 3000);

      alarm.alarmRang = true;
      display();
    }, alarm.timeBeforeAlarm());
  } else {
    alert("you can only set an alarm for the future");
  }
}

function display() {
  filteredAlarms = alarms
    .filter((alarm) => alarm.timeBeforeAlarm() > 0 && alarm.alarmRang == false)
    .sort((a, b) => {
      if (a.timeBeforeAlarm() > b.timeBeforeAlarm()) return 1;
      if (a.timeBeforeAlarm() < b.timeBeforeAlarm()) return -1;
      return 0;
    });

  alarms = filteredAlarms;

  alarmHtml.innerHTML = "";
  console.log(alarms);
  alarms.forEach((alarm, i) => {
    alarmHtml.innerHTML += `<p id='alarm${i}'> You've set an alarm for ${alarm.timeInput} <button  onclick="deleteAlarm(${i})"> delete alarm </button> </p>`;
  });
}

function deleteAlarm(index) {
  console.log(alarms);
  alarms.splice(index, 1);
  display();
}

// setTimeout(() => {
//   alert("ring ring");
// }, alarm.timeBeforeAlarm());

function showAlarmApp() {
  alarmPage.style.zIndex = 25;
}


let vid = document.getElementById('vid')
let canvas = document.getElementById('canvas')


async function openCam(){
  videoPage.style.zIndex = 22
 let stream = await navigator.mediaDevices.getUserMedia({video:true , audio:false})
  vid.srcObject = stream
}

function takePix(){
  canvas.getContext('2d').drawImage( vid,0 , 0 , canvas.width , canvas.height)
  let url = canvas.toDataURL("image/jpg")
  console.log(url)

  imgs.push(url)
  localStorage.setItem('images' , JSON.stringify(imgs))
  
}

let displayPictures = document.getElementById('displayPictures')

function showPictures(){
  let forPics = document.getElementById('forPics')
  displayPictures.style.zIndex = 22
  forPics.innerHTML = ''
  imgs.forEach((img)=> 
forPics.innerHTML +=  `<img  src="${img}" >`)
  
}


// for music app

let musicPage = document.getElementById('musicPage')

function showMusic(){
musicPage.style.zIndex = 22


}

let z = 0
 let audio = document.getElementById('audioFile')
 let isPlaying = false

 let songs = [
  {
    "title": "Death Bed",
    "artist": "Powfu",
    "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
    "id": "1"
  },
  {
    "title": "Bad Liar",
    "artist": "Imagine Dragons",
    "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    "id": "2"
  },
  {
    "title": "Faded",
    "artist": "Alan Walker",
    "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
    "url": "https://samplesongs.netlify.app/Faded.mp3",
    "id": "3"
  },
  {
    "title": "Hate Me",
    "artist": "Ellie Goulding",
    "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
    "id": "4"
  },
  {
    "title": "Solo",
    "artist": "Clean Bandit",
    "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
    "url": "https://samplesongs.netlify.app/Solo.mp3",
    "id": "5"
  },
  {
    "title": "Without Me",
    "artist": "Halsey",
    "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
    "id": "6"
  } , {
    "title": "Cast",
    "artist": "Shalipopi x OdumoduBlvck",
    "artwork": "https://trendybeatz.com/images/Shallipopi-Presido-La-Pluto-AlbumArtwork1.jpg",
    "url": "https://cdn.trendybeatz.com/audio/Shallipopi-Ft-Cast-Odumodublvck-(TrendyBeatz.com).mp3",
    "id": "7"
  }
 
]





 moveBack()
  
 function displaySongs(i){
  z = i

    if(z < 0){
        z = z + 1
    } else if ( z > (songs.length - 1)){
        z = z - 1
    } else {
        musicPage.innerHTML = ''  
    musicPage.innerHTML = `<div id="div" > <img style="width:200px; height:200px; " src="${songs[i].artwork}" />
    <p style="margin:5px; margin-top:10px;">${songs[i].title} </p>
    <small style="margin:5px; ">${songs[i].artist} </small>
    <audio id="audioFile${i}"  loop draggable='true' src="${songs[i].url}"></audio> 

    <div id="controls">
        <input type="number" id="speedControl" oninput="changeSpeed()" step="0.1" min="0.5" max="2" value="1">
    <button id="playButton" onclick="playMusic()" style="margin-left:15px;" > <iconify-icon icon="ph:play-fill" style="color: #000;" width="40"></iconify-icon> </button>
    <input style="background-color:black; width:50px; " type="range" id="volume" min="0" max="1" value="1" step="0.1" oninput="adjustVolume()">
</div>

   
    <button style="position: absolute; top: 0px; left: 10px;" onclick="moveBack()"> <iconify-icon icon="iconamoon:arrow-left-2-bold" style="color: #000;" width="24"></iconify-icon> </button>

 
   

     <button style="position: absolute; top: 45%; left: 10px;" onclick="displaySongs(--z)"><iconify-icon icon="raphael:arrowleft" style="color: #000;" width="24"></iconify-icon> </button>

       <button style="position:absolute; top: 45%; right: 10px;" onclick="displaySongs(++z)"> <iconify-icon icon="raphael:arrowright" style="color: #000;" width="24"></iconify-icon> </button> </div>

       <img style="width:100px; height:30px; margin-top:40px;" src="wisdom (2).jpg">
    `

    audio = document.getElementById(`audioFile${i}`)
    console.log(audio);
    }

 
 }


  function moveBack(){
    z = 0
    y = 0
    musicPage.innerHTML = ''  
    musicPage.innerHTML =  `<div id="songsArray">   <button style="top: 45px; left:0; z-index: 50;" id="backPage" onclick="backPage()">
          
    <iconify-icon
      icon="dashicons:arrow-left-alt2"
      style="color: black"
      width="20"
    ></iconify-icon>
  </button>  </div>`
   songs.map((song)=> { songsArray.innerHTML += `<button id="songButton${y++}" onclick="displaySongs(${z++})" style='width:340px;'> <img style="width:50px; height:50px; margin-left:10px;" src='${song.artwork}' > <p style="width:fit-content; display:flex; flex-direction:column; margin-left:20px;" >  <b style="margin-top:20px;"> ${song.title} </b> <small> ${song.artist} </small>   </p>   </button> 
    
   ` 
   })

 
 }



   

 function playMusic(){
  let playButton = document.getElementById('playButton')
 if ( isPlaying === false) {
    audio.play() 
    isPlaying = true;
    playButton.innerHTML = '<iconify-icon icon="solar:pause-bold" style="color: #000;" width="40"></iconify-icon>'
} else {
  audio.pause() 
  isPlaying = false;
  playButton.innerHTML = '<iconify-icon icon="ph:play-fill" style="color: #000;" width="40"></iconify-icon>'

} 
    
 }

 function adjustVolume(){
    let volume = document.getElementById('volume')
    audio.volume = volume.value
 }



 function changeSpeed () {
    let speedControl = document.getElementById('speedControl');
    const newSpeed = parseFloat(speedControl.value);
    audio.playbackRate = newSpeed; 
}


