// expo install firebase

// Import the functions you need from the SDKs you need
import { firebase, arrayUnion } from "@firebase/app";
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
  projectId: "book-app-24193",
  storageBucket: "book-app-24193.appspot.com",
  messagingSenderId: "575992726940",
  appId: "1:575992726940:web:0c9f6a6977f2c45b173459",
  measurementId: "G-6MGTYYEBK5"
};

const collections = {
  favourites: 'favourite-books',
  read_books: 'read-books',
  ratings: 'ratings',
  statuses: 'book-statuses',
  comments: 'comments',
  times: 'times',
  time_planned: 'times-planned'
}

// Initialize Firebase
let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = app.firestore()
const auth = app.auth()

async function dbCheck(collection, document){
  var docRef = db.collection(collection).doc(document)

  docRef.get().then((doc) => {
    return doc.exists
  }).catch((error) => {
    return false
  });
}

async function dbAdd(collectionName, documentName, data) {
  var z = await db.collection(collectionName).doc(documentName).update(data);
}

async function dbUpdate(collectionName, documentName, data) {
  var z = await db.collection(collectionName).doc(documentName).update(data);
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
import { dbAdd } from "../firebase.js";

const data = {
  idDB: 'test',
  valueDB: 240
}

dbAdd('test', 'Test1', data);

*/

function GetFirebaseUUID(){
  return db.getReference("IDgenerator").push().getKey();
}

let timestamp = firebase.firestore.FieldValue.serverTimestamp


async function dbAddStatus(user_id, book_id, status){
  let data = {
    [book_id] : status
  }

  if(dbCheck(collections.statuses, user_id)) dbUpdate(collections.statuses, user_id, data)
  else dbAdd(collections.statuses, user_id, data)
}

async function dbAddComment(user_id, book_id, comment){
  let comment_id = GetFirebaseUUID()

  let data = {
    [comment_id] : [user_id, timestamp(), comment]
  }

  if(dbCheck(collections.comments, book_id)) dbUpdate(collections.comments, book_id, data)
  else dbAdd(collections.comments, book_id, data)
}

// async function dbSetFavourite(user_id, book_id){
//   let data = {
//     [user_id] : book_id
//   }

//   if(dbCheck(collections.favourites, user_id)) dbUpdate(collections.favourites, user_id, data)
//   else dbAdd(collections.favourites, user_id, data)
// }

async function dbAddRating(user_id, book_id, rating){
  let data = {
    [book_id] : rating
  }

  if(dbCheck(collections.rating, user_id)) dbUpdate(collections.ratings, user_id, data)
  else dbAdd(collections.rating, user_id, data)
}

async function dbAddReadBook(user_id, book_id){
  // if(dbCheck(collections.rating, user_id)) {
  //   db.collection(collections.rating).doc(user_id).get('books').push(book_id)
  //   dbUpdate(collections.ratings, user_id, data)
  // }
  // else dbAdd(collections.rating, user_id, [book_id])

  let data = {
    books : arrayUnion(book_id)
  }

  if(dbCheck(collections.read_books, user_id)) dbUpdate(collections.read_books, user_id, data)
  else dbAdd(collections.read_books, user_id, data)
}

async function dbAddTime(user_id, book_id, time){
  let data = {
    [book_id] : time
  }

  if(dbCheck(collections.times, user_id)) dbUpdate(collections.times, user_id, data)
  else dbAdd(collections.times, user_id, data)
}

async function dbAddTimePlanned(user_id, book_id, hours){
  let data = {
    dates : arrayUnion(timestamp()),
    hours : arrayUnion(hours)
  }

  if(dbCheck(collections.time_planned, user_id)) dbUpdate(collections.time_planned, user_id, data)
  else dbAdd(collections.time_planned, user_id, data)
}


export { db , app , auth , dbAdd, dbUpdate }