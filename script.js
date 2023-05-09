import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
const shoppingList = document.querySelector("#shopping-list");

addButton.addEventListener("click", () => {
  const inputValue = inputField.value;
  if (inputValue.trim().length > 0) {
    clearInputFieldEl();
    push(goodsInDB, inputValue);
  }
  clearInputFieldEl();
});

onValue(goodsInDB, (snapshot) => {
  if (snapshot.exists()) {
    clearShoppinngList();

    const goodsEntries = Object.entries(snapshot.val());

    for (let i = 0; i < goodsEntries.length; i++) {
      appendItemToSoppingList(goodsEntries[i]);
    }
  } else {
    shoppingList.innerHTML = "No items here... yet";
  }
});

function clearInputFieldEl() {
  inputField.value = "";
}

function clearShoppinngList() {
  shoppingList.innerHTML = "";
}

function appendItemToSoppingList(goodsEntries) {
  const [id, value] = goodsEntries;
  const newLiEl = document.createElement("li");
  newLiEl.textContent = value;
  shoppingList.append(newLiEl);
  newLiEl.addEventListener("click", () => {
    const locationOfGoodsInDB = ref(database, `goods/${id}`);
    remove(locationOfGoodsInDB);
  });
}
