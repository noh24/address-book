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
AddressBook.prototype.updateContactLastName = function(id, newLastName) {
  if (this.contacts[id] !== undefined) {
    this.contacts[id].lastName = newLastName;
    return "Contact's last name has been updated to " + newLastName;
  }
  return "There is no contact registered to ID: " + id + ".";
};

// Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//UI
let addressBook = new AddressBook();

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
  addressBook.addContact(newContact);
  listContacts(addressBook);
  
  document.getElementById("new-first-name").value = null;
  document.getElementById("new-last-name").value = null;
  document.getElementById("new-phone-number").value = null;
}

document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
document.querySelector("button.delete").addEventListener("click", handleDelete);
