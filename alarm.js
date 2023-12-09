
let timee = document.getElementById("timee");
let alarms = [];
let alarmHtml = document.getElementById("alarm");
let alarmAudio = new Audio("iPhone-Alarm-Original.mp3");
let alarmPage = document.getElementById("alarmPage");

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
  
  
  