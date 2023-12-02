
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
  let displayBalance = document.getElementById('displayBalance')


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
    rechargeCard.style.zIndex = -1
  }

  function genAirtime() {
    let small = document.getElementById('smalltext')
    small.style.fontSize = '10px'
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
    small.innerHTML = "Make sure you've picked a Provider & Amount"
    } else if (gottenPin == null) {
        small.innerHTML =  ""
      gottenPin = [];
      gottenPin.push(card);
      localStorage.setItem("card", JSON.stringify(gottenPin));
      dispCards();
      pin = "";
    } else {
        small.innerHTML =  ""
      gottenPin.push(card);
      localStorage.setItem("card", JSON.stringify(gottenPin));
      dispCards();
      pin = "";
    }
  }
  console.log(gottenPin);

  function dispCards() {
    n = 0
    tbody.innerHTML = "";
    gottenPin.forEach((el, i) => {
      document.getElementById("tbody").innerHTML += `
                <tr>
                    <td >
                        <input id="copied${i}" value="${el.pin}" /> 
                        <button onclick="copyPin(${i})"> <iconify-icon id='iconcolor${i}' icon="bxs:copy" style="color: #626262;" width="16"></iconify-icon>  </button>   
                    </td>
                    <td>${el.used}</td>
                    <td>${el.provider}</td>
                    <td>${el.amount}</td>
                    
                </tr>`;
    });
  }

  dispCards();

  function CallNum() {
    let showCallBal =  document.getElementById('showingBal')
    let loadedAirtime = String(callInput.value).trim();
    let pattern = /^[*]{1}[3]{1}[1]{2}[*]{1}[0-9]{10}[#]{1}$/;

    let found = gottenPin.find((el) => el.pin == loadedAirtime.slice(5, 15));
    console.log(found);
  if (!found){
    showCallBal.innerHTML = `   <p style="margin-top: 15px;"> Invalid pin </p>
    <button onclick="remove()"> Ok </button>  `
    displayBalance.style.zIndex = 22
    callInput.value = ''
  return;
  } 
 else if (!pattern.test(loadedAirtime)) {
        showCallBal.innerHTML = ` <p style="margin-top: 15px;">  Invalid format </p>
        <button onclick="remove()"> Ok </button>   `
        displayBalance.style.zIndex = 22
        callInput.value = ''
      return;
    }else if ( found.provider == "Airtel" || found.provider == "9mobile" || found.provider == "Glo"){showCallBal.innerHTML = ` <p style="margin-top: 15px;">  Invalid network </p>
    <button onclick="remove()"> Ok </button>   `
    displayBalance.style.zIndex = 22
    callInput.value = ''
  return  }  else   if (found.used == true) {
    showCallBal.innerHTML = `   <p style="margin-top: 15px;">  Airtime has already been used </p>
    <button onclick="remove()"> Ok </button>  `
    displayBalance.style.zIndex = 22
    callInput.value = ''
  return;
}  else if (pattern.test(loadedAirtime) && found.provider == "MTN") {
    found.used = true;
    localStorage.setItem("card", JSON.stringify(gottenPin));
    MtnBalance += Number(found.amount);
    localStorage.setItem("theBalance", JSON.stringify(MtnBalance));
   balMTN.innerHTML = MtnBalance;
   dispCards();  
   displayBalance.style.zIndex = 22
   callInput.value = ''
  } else{
    showCallBal.innerHTML = `   <p style="margin-top: 15px;"> Invalid code </p>
    <button onclick="remove()"> Ok </button>  `
    displayBalance.style.zIndex = 22
    callInput.value = ''
  return;
  }
    

  } 



  async function copyPin(i) {
    let pinVal = document.getElementById(`copied${i}`).value;
    let copyText = document.getElementById(`copied${i}`);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    await navigator.clipboard.writeText(pinVal);
    document.getElementById(`iconcolor${i}`).style.color = 'grey';
  }

  function showRechargeApp() {
    rechargeCard.style.zIndex = 22;
  }

  function remove(){
    displayBalance.style.zIndex = -1
  }
//   localStorage.removeItem('card')
