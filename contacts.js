let contactsPage = document.getElementById("contactsPage");
let savedContacts = JSON.parse(localStorage.getItem("savedContacts")) || [];
let contactsDiv = document.getElementById("contacts-div");
let addContactss = document.getElementById("addContacts");
let backPagee = document.getElementById("backPagee");
let index;

function sortContacts() {
  savedContacts.sort((a, b) => {
    if (a.firstName > b.firstName) return 1;
    if (a.firstName < b.firstName) return -1;
    return 0;
  });
}

sortContacts();

function mapContacts() {
  let mappedContacts = savedContacts.map((cl, i) => {
    return `<button id="${i}"  onclick="viewContact(event)"  class="w-100 d-flex" style=" background-color:black; color:white; border:1px solid grey; height:30px; align-items:center; justify-content:start;">  <small id="${i}" class="ms-2"> ${cl.firstName} ${cl.lastName} </small>  </button>`;
  });

  return mappedContacts;
}

function addContacts() {
  contactsDiv.innerHTML = "";
  backPagee.style.visibility = "hidden";
  addContactss.style.visibility = "hidden";
  contactsDiv.innerHTML = `
<button style="position: absolute; color:white; left: 10px; top: 40px; border: none; background-color: black;"  onclick="cancelContacts()">
 Cancel  
 </button>
<button style="position: absolute; color:white; left: 35%; top: 40px; border: none; background-color: black;"  >
 New Contact
 </button>
<button  style="position: absolute;  color:white; right: 10px; top: 40px; border: none; background-color: black;"  onclick="saveContacts(mapContacts)">
Done
</button>
<div id="ProfilePhoto" class="w-100 d-flex" style="height:140px; margin-top:90px; flex-direction:column; align-items:center; justify-content:center;">        
<img id="profileImage" style="width: 100px; height: 100px; border-radius: 50%;" src="IMG_5442.webp" alt="">
<input class="ms-5" type="file" id="myFile" accept=".jpeg" onchange="readFile()"/>
<small style="cursor:pointer; position:absolute; top:200px; color: #1778f2; z-index:1;"> Add Photo </small>
</div>

<input id='contact-firstname' type="text" class="w-100 ps-2" placeholder='First name' style="border:none; height:40px; color:white; background-color:#626262; outline:none; " /> 
 <input id='contact-lastname' type="text" class="w-100 ps-2" placeholder='Last name' style="border:none; height:40px; color:white; background-color:#626262; outline:none; " /> 
 <input id='contact-phone' type="text" class="w-100 ps-2" placeholder='add phone' style="border:none; height:40px; color:white; background-color:#626262; outline:none; " /> 
<input id='contact-email' type="text" class="w-100 ps-2" placeholder='add email' style="border:none; height:40px; color:white; background-color:#626262; outline:none; " /> 
`;
}

function displayContactsPage() {
  contactsDiv.innerHTML = "";
  backPagee.style.visibility = "visible";
  addContactss.style.visibility = "visible";
  contactsDiv.innerHTML = ` <h1 class="ms-3" style=" color: white; font-family: Impact, Haettenschweiler; font-size: 25px; margin-top:70px ;">Contacts</h1>
  <input class="ms-3 mb-2" oninput="searchContacts()"  type="search" id="contactInput" style=" border-radius: 10px; font-size:15px; height: 35px; width: 90%; padding-left: 10px;" placeholder="Search" />
  <p class="w-100 bg-dark" style="height: 2px; "> </p> 
  <div style="display: flex; align-items: center; height: 60px; " class="w-100 mb-2 " >
  <img class="ms-3 me-3" style="border-radius: 50%; width: 50px; height: 50px;" src="IMG_5442.webp" alt="">  
  <legend class="w-25 d-flex h-100" style="height: 100%; color: white; font-size: 14px; flex-direction: column; text-align: left; justify-content: center; ">
    <b class="mt-1">Dubem</b>
    <small>My Card</small>
  </legend>
  </div>
  <p class="w-100 bg-dark" style="height: 2px; "> </p>
  <div id="forContactList">
  ${mapContacts().join("")}
  </div>
  
  `;
}

let myFileData = JSON.parse(localStorage.getItem("iphoneProfilePhoto")) || "";

function readFile() {
  let myFile = document.getElementById("myFile");
  let file = myFile.files[0];
  let reader = new FileReader();

  reader.addEventListener("load", (e) => {
    myFileData = e.target.result;
    localStorage.setItem("iphoneProfilePhoto", JSON.stringify(myFileData));
    imageForContacts = document.getElementById("profileImage");
    imageForContacts.src = myFileData;
  });

  if (file) {
    reader.readAsDataURL(file);
  }
}

function saveContacts(map) {
  let contactFirstname = document.getElementById("contact-firstname");
  let contactLastname = document.getElementById("contact-lastname");
  let contactPhone = document.getElementById("contact-phone");
  let contactEmail = document.getElementById("contact-email");
  let phone = String(contactPhone.value).trim();
  let email = String(contactEmail.value).trim();
  let phoneRegex = /^[0]{1}[7-9]{1}[0-1]{1}[0-9]{8}$/;
  let emailRegex = /^\w+[@]{1}[A-Za-z]+[.]{1}[a-zA-Z]+$/;
  if (contactFirstname.value == "") {
    alert("Firstname field is compulsory");
    return;
  } else if (
    savedContacts.some(
      (cl) =>
        String(contactFirstname.value).trim() == cl.firstName &&
        String(contactLastname.value).trim() == cl.lastName
    )
  ) {
    alert("contact name already exists");
    contactFirstname.value = "";
    contactLastname.value = "";
    contactPhone.value = "";
    contactEmail.value = "";
    return;
  } else if (!phoneRegex.test(phone)) {
    alert("Invalid Phone number");
    contactFirstname.value = "";
    contactLastname.value = "";
    contactPhone.value = "";
    contactEmail.value = "";
    return;
  } else if (!emailRegex.test(email)) {
    alert("Invalid email");
    contactFirstname.value = "";
    contactLastname.value = "";
    contactPhone.value = "";
    contactEmail.value = "";
    return;
  } else {
    let contact = {
      firstName: String(contactFirstname.value).trim(),
      lastName: String(contactLastname.value).trim(),
      phoneNumber: String(contactPhone.value).trim(),
      email: String(contactEmail.value).trim(),
      image: myFileData,
    };

    savedContacts.push(contact);
    localStorage.setItem("savedContacts", JSON.stringify(savedContacts));
    mapContacts();

    displayContactsPage();
  }
}

function viewContact(event) {
  el = event.target;
  console.log(el);
  elId = el.id;
  index = elId;

  localStorage.setItem("clickedContact", JSON.stringify(savedContacts[elId]));
  let clickedContact = JSON.parse(localStorage.getItem("clickedContact"));
  contactsDiv.innerHTML = "";
  backPagee.style.visibility = "hidden";
  addContactss.style.visibility = "hidden";
  contactsDiv.innerHTML = `
<button style="position: absolute; color:white; left: 10px; top: 40px; border: none; background-color: black;"  onclick="cancelContacts()">
Cancel
</button>
<button style="position: absolute; color:white; left: 35%; top: 40px; border: none; background-color: black;"  >
Contact Details
</button>
<button style="position:absolute; color:white; right: 10px; top: 40px; border: none; background-color: black;"  onclick="editContacts()">
Edit
</button>
<div  id="ProfilePhoto" class="w-100 d-flex " style="height:140px;  margin-top:90px;  flex-direction:column; align-items:center; justify-content: center;">         
<img id="profileImage" style="width: 100px; height: 100px; border-radius: 50%;" src="${clickedContact.image}" alt="">
 </div>

 <div>  </div>

<p  class="w-100 ps-2 d-flex" style=" font-size:14px; border:none; align-items:center; justify-content:start;  height:45px; color:white; background-color:#626262;  " > First-Name: ${clickedContact.firstName}</p> 
<p  class="w-100 ps-2 d-flex"  style="font-size:14px; border:none; align-items:center; justify-content:start; height:45px; color:white; background-color:#626262;  " > Last-Name: ${clickedContact.lastName}</p> 
<p  class="w-100 ps-2 d-flex"  style="font-size:14px; border:none; align-items:center; justify-content:start; height:45px; color:white; background-color:#626262;  " > Phone-Number: ${clickedContact.phoneNumber} </p> 
<p  class="w-100 ps-2 d-flex" style="font-size:14px; border:none; align-items:center; justify-content:start; height:45px; color:white; background-color:#626262;  " > Email-Address: ${clickedContact.email} </p> 
    

<button onclick="deleteContact()" style="margin:auto; width:60px; height:30px; color:red; background-color:gray; border-radius:15px; align-item:center; justify-content:center; display:flex;"  > Delete </button>

`;
}

function cancelContacts() {
  savedContacts = JSON.parse(localStorage.getItem("savedContacts"));
  return displayContactsPage();
}

function showContactsPage() {
  contactsPage.style.zIndex = 25;
  callPage.style.zIndex = -1;
}

function editContacts() {
  contactsDiv.innerHTML = "";
  backPagee.style.visibility = "hidden";
  addContactss.style.visibility = "hidden";
  contactsDiv.innerHTML = `
<button style="position: absolute; color:white; left: 10px; top: 40px; border: none; background-color: black;"  onclick="cancelContacts()">
 Cancel  
 </button>
<button style="position: absolute; color:white; left: 35%; top: 40px; border: none; background-color: black;"  >
 Edit Contact
 </button>
<button  style="position: absolute;  color:white; right: 10px; top: 40px; border: none; background-color: black;"  onclick="saveEditedContacts(mapContacts)">
Done
</button>
<div id="ProfilePhoto" class="w-100 d-flex" style="height:140px; margin-top:90px; flex-direction:column; align-items:center; justify-content:center;">        
<img id="profileImage" style="width: 100px; height: 100px; border-radius: 50%;" src="IMG_5442.webp" alt="">
<input class="ms-5" type="file" id="myFile" accept=".jpeg" onchange="readFile()"/>
<small style="cursor:pointer; position:absolute; top:200px; color: #1778f2; z-index:1;"> Add Photo </small>
</div>

<input id='contact-firstname' value="${savedContacts[index].firstName}" type="text" class="w-100 ps-2" placeholder='First name' style="border:none; height:40px; color:white; background-color:#626262; outline:none; " /> 
 <input id='contact-lastname' value="${savedContacts[index].lastName}" type="text" class="w-100 ps-2" placeholder='Last name' style="border:none; height:40px; color:white; background-color:#626262; outline:none; " /> 
 <input id='contact-phone' value="${savedContacts[index].phoneNumber}"  type="text" class="w-100 ps-2" placeholder='add phone' style="border:none; height:40px; color:white; background-color:#626262; outline:none; " /> 
<input id='contact-email' value="${savedContacts[index].email}" type="text" class="w-100 ps-2" placeholder='add email' style="border:none; height:40px; color:white; background-color:#626262; outline:none; " /> 
`;
}

function saveEditedContacts(map) {
  let contactFirstname = document.getElementById("contact-firstname");
  let contactLastname = document.getElementById("contact-lastname");
  let contactPhone = document.getElementById("contact-phone");
  let contactEmail = document.getElementById("contact-email");

  let phone = String(contactPhone.value).trim();
  let email = String(contactEmail.value).trim();
  let phoneRegex = /^[0]{1}[7-9]{1}[0-1]{1}[0-9]{8}$/;
  let emailRegex = /^\w+[@]{1}[A-Za-z]+[.]{1}[a-zA-Z]+$/;
  if (contactFirstname.value == "") {
    alert("Firstname field is compulsory");
    return;
  } else if (!phoneRegex.test(phone)) {
    alert("Invalid Phone number");
    return;
  } else if (!emailRegex.test(email)) {
    alert("Invalid email");
    return;
  } else {
    let contact = {
      firstName: String(contactFirstname.value).trim(),
      lastName: String(contactLastname.value).trim(),
      phoneNumber: String(contactPhone.value).trim(),
      email: String(contactEmail.value).trim(),
      image: myFileData,
    };

    savedContacts.splice(index, 1, contact);
    sortContacts();
    localStorage.setItem("savedContacts", JSON.stringify(savedContacts));
    mapContacts();
    displayContactsPage();
  }
}

function deleteContact() {
  localStorage.setItem("deleted", JSON.stringify(savedContacts[index]));
  let deletedContact = JSON.parse(localStorage.getItem("deleted"));
  savedContacts.splice(index, 1);
  sortContacts();
  localStorage.setItem("savedContacts", JSON.stringify(savedContacts));
  mapContacts();
  displayContactsPage();
  alert(`${deletedContact.firstName}'s contact has been deleted`);
}

function searchContacts() {
  let contactInput = document.getElementById("contactInput");
  let contactInputValue = String(contactInput.value).trim().toLowerCase();
  let forContactList = document.getElementById("forContactList");

  savedContacts = savedContacts.filter(({ firstName }) =>
    String(firstName).toLowerCase().includes(contactInputValue)
  );

  if (savedContacts.length == 0) {
    savedContacts = JSON.parse(localStorage.getItem("savedContacts"));
    forContactList.innerHTML = `<p style="padding-left:5px; color:white;"> Contact does not exist </>`;
  } else if (contactInputValue.length == 0) {
    savedContacts = JSON.parse(localStorage.getItem("savedContacts"));
    forContactList.innerHTML = ``;
    forContactList.innerHTML = `${mapContacts().join("")}`;
  } else {
    forContactList.innerHTML = ``;
    forContactList.innerHTML = `${mapContacts().join("")}`;
  }
}

displayContactsPage();
