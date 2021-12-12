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

//if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
//} else {
//  firebase.app();
//}

const db = app.firestore()
const auth = app.auth()

async function dbCheck(collection, document){
  
  let docRef = db.collection(collection).doc(document).get().then((doc) => {
      return doc.exists
    }).catch((error) => {
      console.log(error)
      return false
    });

    return docRef;
  
  // docRef.get().then((doc) => {
  //   return doc.exists
  // }).catch((error) => {
  //   return false
  // });
}

//DEPRECATED
async function dbAdd(collectionName, documentName, data) {
  await db.collection(collectionName).doc(documentName).set(data);
}

async function dbUpdate(collectionName, documentName, data) {
  await db.collection(collectionName).doc(documentName).update(data);
}

async function dbSet(collenctionName, data){
  await db.collection(collectionName).add(data)
}

/*Testowa funkcja dodająca wartości do bazy
struktura danych:
const data = {
  label1: value1,
  label2: value2
}

async function dbAdd(collectionName, documentName, data) {
  let z = await db.collection(collectionName).doc(documentName).set(data);
}

call:
import { dbAdd } from "../firebase.js";

const data = {
  idDB: 'test',
  valueDB: 240
}

dbAdd('test', 'Test1', data);

*/

async function GetFirebaseUUID(){
  return db.collection("IDgenerator").add({a : 1}).then((doc) => doc.id);
}

let timestamp = firebase.firestore.FieldValue.serverTimestamp


async function dbAddStatus(user_id, book_id, status){
  let data = {
    user_id : user_id,
    book_id : book_id,
    status : status
  }
  dbSet(collections.statuses, data)
}

async function dbAddComment(user_id, book_id, comment){
  let comment_id = await GetFirebaseUUID()
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;
  let data = {
    [comment_id] : [user_id, dateTime, comment]
  }

  if(await dbCheck(collections.comments, book_id)) await dbUpdate(collections.comments, book_id, data)
  else {
    console.log(data)
    await dbAdd(collections.comments, book_id, data)
  }
}

async function dbAddRating(user_id, book_id, rating){
  let data = {
    [book_id] : rating
  }

  if(await dbCheck(collections.rating, user_id)) await dbUpdate(collections.ratings, user_id, data)
  else await dbAdd(collections.rating, user_id, data)
}

async function dbAddReadBook(user_id, book_id){
  let data = {
    books : arrayUnion(book_id)
  }

  if(await dbCheck(collections.read_books, user_id)) await dbUpdate(collections.read_books, user_id, data)
  else await dbAdd(collections.read_books, user_id, data)
}

async function dbAddTime(user_id, book_id, time){
  let data = {
    [book_id] : time
  }

  if(await dbCheck(collections.times, user_id)) await dbUpdate(collections.times, user_id, data)
  else await dbAdd(collections.times, user_id, data)
}

async function dbAddTimePlanned(user_id, book_id, hours){
  let data = {
    [GetFirebaseUUID()]: {
      dates : timestamp(),
      hours : hours
    }
  }

  if(await dbCheck(collections.time_planned, user_id)) await dbUpdate(collections.time_planned, user_id, data)
  else await dbAdd(collections.time_planned, user_id, data)
}

//TO TEST
async function dbGetDoc(collection, doc){
  if(await dbCheck(collection, doc)) return db.collection(collection).doc(doc)
  else return undefined 
}

async function dbGetField(collection, doc, field){
  try{
    return dbGetDoc(collection, doc).get(field)
  } catch(error){
    console.log(error)
    return undefined
  }


async function dbGetData(collection, doc){
  try{
    return dbGetDoc(collection, doc)
  } catch(error){
    console.log(error)
    return undefined
  }
}

async function dbGetStatus(user_id, book_id){
  return await dbGetField(collections.statuses, user_id, book_id)
}

async function dbGetUserStatuses(user_id){
  return await dbGetData(collections.statuses, user_id)
}

async function dbGetComments(book_id){
  return await dbGetData(collections.comments, book_id)
}

async function dbGetRating(user_id, book_id){
  return await dbGetField(collections.ratings, user_id, book_id)
}

async function dbGetUserRatings(user_id){
  return await dbGetData(collections.ratings, user_id)
}

async function dbGetReadBooks(user_id){
  return await dbGetData(collections.read_books, user_id)
}

async function dbGetTimes(user_id, book_id){
  return await dbGetField(collections.times, user_id, book_id)
}

async function dbGetUserTimes(user_id){
  return await dbGetData(collections.times, user_id)
}

async function dbGetUserTimesPlanned(user_id){
  return await dbGetData(collections.time_planned, user_id)
}

export { db , app , auth ,
   dbAdd, dbUpdate, dbAddComment, dbAddRating, dbAddReadBook, 
   dbAddStatus, dbAddTime, dbAddTimePlanned }