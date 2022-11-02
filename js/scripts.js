//Business Logic for CSSOM : Locating stylesheets
// function locateStyleSheet() {
//   let indexLocation;
//   const styleSheetArray = Array.from(document.styleSheets);
//   styleSheetArray.forEach(function(stylesheet, index) {
//     if (stylesheet.href) {
//       if (stylesheet.href.includes("styles.css")) {
//         indexLocation = index;
//       }
//     } 
//   });
//   return indexLocation;
// }
//const indexOfCustomStylesheet = locationStyle();
//const customStyleSheet = document.styleSheets[indexOfCustomStylesheet]
  //customStyleSheet.cssRules //lists css Rules
  //customStyleSheet.insertRule("body { background-color: red; }", index); //assign inserted rule to any index;
  //customStyleSheet.deleteRule(index); //delete the css rule assigned to index argument
//Business Logic for Address Book
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};
AddressBook.prototype.assignId = function () {
  this.currentId++;
  return this.currentId;
};
AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};
AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false
  }
  delete this.contacts[id];
  return true;
};
// AddressBook.prototype.updateContactLastName = function(id, newLastName) {
//   if (this.contacts[id] !== undefined) {
//     this.contacts[id].lastName = newLastName;
//     return "Contact's last name has been updated to " + newLastName;
//   }
//   return "There is no contact registered to ID: " + id + ".";
// };

// Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addressTypes = [];
  this.addresses = [];
  this.numAddresses = 0;
}


Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//UI
let addressBook = new AddressBook();

function createAddressBox() {
  numAddressBoxes++;
  const div = document.createElement("div");
  div.setAttribute("class", "form-group");
  const label = document.createElement("label");
  label.setAttribute("for", "address" + numAddressBoxes);
  label.innerText = "Address: " + numAddressBoxes;
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "form-control");
  input.setAttribute("id", "address" + numAddressBoxes);
  input.setAttribute("name", "address" + numAddressBoxes);
  
  const label2 = document.createElement("label");
  label2.setAttribute("for", "addressType" + numAddressBoxes);
  label2.innerText = "Type: " + numAddressBoxes;
  const input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("class", "form-control");
  input2.setAttribute("id", "addressType" + numAddressBoxes);
  input2.setAttribute("name", "addressType" + numAddressBoxes);
  
  div.append(label2);
  div.append(input2);
  div.append(label);
  div.append(input);
  
  document.getElementById("addressButton").before(div);
}

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector("div#contact-details").removeAttribute("class");
  document.querySelector("button.delete").setAttribute("id", contact.id);

  for (let i = 0; i < contact.numAddresses; i++) {
    const p = document.createElement("p");
    p.innerText = contact.addressTypes[i] + " Address" + " : " + contact.addresses[i];
    document.querySelector("div#displayed-addresses").append(p);
  }
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(e) {
  e.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;

  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);

    for (let i = 1; i <= numAddressBoxes; i++) {
      const inputtedAddress = document.querySelector("input#address"+i).value;
      const inputtedAddressType = document.querySelector("input#addressType"+i).value;
      newContact.addresses.push(inputtedAddress);
      newContact.addressTypes.push(inputtedAddressType);
      newContact.numAddresses++;
    }
    
  addressBook.addContact(newContact);
  listContacts(addressBook);
  
  document.getElementById("new-first-name").value = null;
  document.getElementById("new-last-name").value = null;
  document.getElementById("new-phone-number").value = null;
  document.getElementById("addressType1").value = null;
  document.getElementById("address1").value = null;
}

let numAddressBoxes = 1;
document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
document.querySelector("button.delete").addEventListener("click", handleDelete);
document.getElementById("addressButton").addEventListener("click", createAddressBox);