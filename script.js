import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-c9722-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const goodsInDB = ref(database, "goods");

const addButton = document.querySelector("#add-button");
const inputField = document.querySelector("#input-field");

addButton.addEventListener("click", () => {
  const inputValue = inputField.value;
  push(goodsInDB, inputValue);
  console.dir(`${inputValue} added to database`);
});
