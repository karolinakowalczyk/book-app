// expo install firebase

// Import the functions you need from the SDKs you need
import { firebase } from "@firebase/app";
import '@firebase/auth'
import '@firebase/firestore'
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqT5Ij4b6XWIQxusZDeuB6zeXf5dOv6o4",
  authDomain: "book-app-24193.firebaseapp.com",
  databaseURL: "https://book-app-24193-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "book-app-24193",
  storageBucket: "book-app-24193.appspot.com",
  messagingSenderId: "575992726940",
  appId: "1:575992726940:web:0c9f6a6977f2c45b173459",
  measurementId: "G-6MGTYYEBK5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = app.firestore()
const auth = app.auth()

async function dbAdd(collectionName, documentName, data) {
  var z = await db.collection(collectionName).doc(documentName).set(data);
}

/*Testowa funkcja dodająca wartości do bazy
struktura danych:
const data = {
  label1: value1,
  label2: value2
}

async function dbAdd(collectionName, documentName, data) {
  var z = await db.collection(collectionName).doc(documentName).set(data);
}

call:
const data = {
  idDB: 'test',
  valueDB: 240
}

dbAdd('test', 'Test1', data);

*/

export { db, auth , dbAdd }