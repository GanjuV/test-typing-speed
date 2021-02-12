import localforage from "localforage";

// Using config()
localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
  name: "myApp", // These fields
  version: 1.0, // are totally optional
});

export const store = localforage.createInstance({
  name: "gameId",
});
