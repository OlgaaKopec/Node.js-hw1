const { listContacts, getContactById, removeContact, addContact } = require("./src/contacts.cjs"); 
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

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const tableContacts = await listContacts();
            console.table(tableContacts);
            break;

        case "get":
            const contact = await getContactById(id);
            if (contact) {
                console.log(contact);
            } else {
                console.log(`Contact with id ${id} not found`);
            }
            break;

        case "add":
            await addContact(name, email, phone);
            break;

        case "remove":
            await removeContact(id);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);