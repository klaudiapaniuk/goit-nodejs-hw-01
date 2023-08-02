const contactsOperations = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const contacts = await contactsOperations.listContacts();
			console.table(contacts);
			break;

		case "get":
			const getContact = await contactsOperations.getContactById(id);
			console.table(getContact);
			break;

		case "add":
			const addNewContact = await contactsOperations.addContact(
				name,
				email,
				phone
			);
			console.table(addNewContact);
			break;

		case "remove":
			const removeContact = await contactsOperations.removeContact(id);
			console.table(removeContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
