const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve('./db/contacts.json');
const { nanoid } = require("nanoid");


async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log(error);
  }    
};


async function getContactById(contactId) {
  try {
    const arrayOfContacts = await listContacts();
    const contactById = arrayOfContacts.find(contact =>
      contact.id === contactId.toString());
    if (!contactById) {
      console.log(`NO CONTACT WAS FOUND WITH ID=${contactId}`);
      return;
    };
    console.log(`FOUND CONTACT:\n`, contactById);
  } catch (error) {
    console.log(error);
  }; 
};


async function removeContact(contactId) {
  try {
    const arrayOfContacts = await listContacts();
    const filteredArrayOfContacts = arrayOfContacts.filter(contact =>
      contact.id !== contactId.toString());

    if (filteredArrayOfContacts.length === arrayOfContacts.length) {
      console.log(`NO CONTACT WITH ID=${contactId} WAS FOUND. THIS COMMAND CANNOT BE PERFORM`);
      return;
    }
    
    await fs.writeFile(contactsPath, JSON.stringify(filteredArrayOfContacts));
    console.log('REMOVED SUCCESSFULLY');
  } catch (error) {
    console.log(error);
  };
};


async function addContact(name, email, phone) {
  try {
    const arrayOfContacts = await listContacts();
    const newContact = {
      id: nanoid().toString(),
      name,
      email,
      phone,
    };
    arrayOfContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(arrayOfContacts));
    console.log(`NEW CONTACT "${newContact.name}" WAS ADDED SUCCESSFULLY`);
  } catch (error) {
    console.log(error);
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};