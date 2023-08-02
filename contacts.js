const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactPath);
		const contacts = JSON.parse(data);
		return contacts;
	} catch (error) {
		console.log("Error reading file:", error);
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		const contact = contacts.find(({ id }) => id === contactId);
		return contact;
	} catch (error) {
		console.log(`Could not find a contact with id ${contactId}`);
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		const contactIndex = contacts.filter(({ id }) => id === contactId);
		console.log(`contact ${contactId} removed`);
		return contactIndex;
	} catch (error) {
		console.log(`Could not delete the contact with ID:${contactId}`, error);
	}
}

async function addContact(name, email, phone) {
	const list = await listContacts();
	const newContact = { id: nanoid(), name: name, email: email, phone: phone };
	const newList = [...list, newContact];
	return newList;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
