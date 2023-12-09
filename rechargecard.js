
let rechargeCard = document.getElementById("rechargeCard");
let balMTN = document.getElementById("balMTN");
let displayBalance = document.getElementById("displayBalance");
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
  
  