const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://tododb123.documents.azure.com:443/";
const key =
  "GIrfeEx24WI680A3yImoHeFEtJiIctdWXrEBxyY8vdHFY2nA7SsQB1O705ulvglZANhfgw6OESiYACDbH7PwOw==";
const databaseId = "todo-db";
const containerId = "tasks";

const client = new CosmosClient({ endpoint, key });
const container = client.database(databaseId).container(containerId);

async function getTasks() {
  const { resources } = await container.items
    .query("SELECT * FROM c")
    .fetchAll();
  return resources;
}

async function addTask(task) {
  const newTask = {
    id: Date.now().toString(),
    text: task.text,
    completed: false,
  };
  const { resource } = await container.items.create(newTask);
  return resource;
}

async function deleteTask(id) {
  await container.item(id, id).delete();
}

module.exports = { getTasks, addTask, deleteTask };
