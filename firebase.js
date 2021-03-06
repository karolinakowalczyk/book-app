// expo install firebase

// Import the functions you need from the SDKs you need
import { firebase, arrayUnion } from "@firebase/app";
import '@firebase/auth'
import '@firebase/firestore'
import moment from 'moment'
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

const book_statuses = {
  plan : "Plan to read",
  reading : "Reading",
  finished : "Finished",
  onHold : "On Hold",
  drop : "Dropped"
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

async function dbSet(collectionName, data){
  await db.collection(collectionName).add(data)
}

/*Testowa funkcja dodaj??ca warto??ci do bazy
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

function mkFilter(field, operation, value){
  return {
    field : field,
    op : operation,
    value : value
  }
}

function timestamp(){
  let dateTime = new Date();
  return dateTime
}

async function dbAddStatus(user_id, book_id, status, title, author_name, cover){
  let data = {
    user_id : user_id,
    book_id : book_id,
    status : status,
    title : title,
    author_name : author_name,
    cover : cover
  }

  let check = await dbGetStatus(user_id, book_id)
  if(check.length == 0) await dbSet(collections.statuses, data)
  else await dbUpdate(collections.statuses, check[0].id, data)
}

async function dbAddComment(user_id, book_id, comment){

  let data = {
    user_id : user_id, 
    dateTime : timestamp(),
    comment : comment,
    book_id : book_id
  }

  await dbSet(collections.comments, data)
}

async function dbAddRating(user_id, book_id, rating){
  let data = {
    book_id : book_id,
    rating : rating,
    user_id : user_id
  }

  let check = await dbGetRating(user_id, book_id)
  if(check.length == 0) await dbSet(collections.ratings, data)
  else dbUpdate(collections.ratings, check[0].id, data)
}

async function dbAddReadBook(user_id, book_id){
  let data = {
    user_id : user_id,
    book_id : book_id
  }

  await dbSet(collections.read_books, data)
}

async function dbAddTime(user_id, book_id, time, dateTime){
  let data = {
    book_id : book_id,
    time : time,
    user_id : user_id,
    dateTime : dateTime
  }

  await dbSet(collections.times, data)
}

async function dbAddTimePlanned(user_id, hours, dateTime){
  let data = {
    user_id : user_id,
    hours : hours,
    dateTime : dateTime
  }

  await dbSet(collections.time_planned, data)
}

//GETS
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
}

async function dbGetData(collection, doc){
  try{
    return dbGetDoc(collection, doc)
  } catch(error){
    console.log(error)
    return undefined
  }
}

async function dbGet(collection, filter){
  let data = []
  await db.collection(collection).where(filter.field, filter.op, filter.value).get().then((querySnapshot) => {
    querySnapshot.forEach(element => {
      let d = element.data()
      d.id = element.id
      data.push(d)
    })
  })
  return data
}

async function dbGet2Filter(collection, filter1, filter2){
  let data = []
  await db.collection(collection).
  where(filter1.field, filter1.op, filter1.value).
  where(filter2.field, filter2.op, filter2.value)
  .get().then((querySnapshot) => {
    querySnapshot.forEach(element => {
      let d = element.data()
      d.id = element.id
      data.push(d)
    })
  })
  return data
}

async function dbGetStatus(user_id, book_id){
  return await dbGet2Filter(collections.statuses, mkFilter("user_id", "==", user_id), mkFilter("book_id", "==", book_id))
}

async function dbGetUserStatuses(user_id){
  return await dbGet(collections.statuses, mkFilter("user_id", "==", user_id))
}

async function dbGetComments(book_id){
  return await dbGet(collections.comments, mkFilter("book_id", "==", book_id))
}

async function dbGetRating(user_id, book_id){
  return await dbGet2Filter(collections.ratings, mkFilter("user_id", '==', user_id), mkFilter('book_id', '==', book_id))
}

async function dbGetUserRatings(user_id){
  return await dbGet(collections.ratings, mkFilter("user_id", "==", user_id))
}

async function dbGetReadBooks(user_id){
  return await dbGet2Filter(collections.statuses, mkFilter("user_id", "==", user_id), mkFilter("status", "==", book_statuses.finished))
}

async function dbGetTimes(user_id, book_id){
  return await dbGet2Filter(collections.times, mkFilter("user_id", '==', user_id), mkFilter('book_id', '==', book_id))
}

async function dbGetUserTimes(user_id){
  return await dbGet(collections.times, mkFilter('user_id', '==', user_id))
}

async function dbGetUserTimesPlanned(user_id){
  return await dbGet(collections.time_planned, mkFilter('user_id', '==', user_id))
}

async function GetPlanningStats(user_id){
  let plans = await dbGetUserTimesPlanned(user_id)
  let times = await dbGetUserTimes(user_id)

  let planWeek = {}
  let timesWeek = {}

  for(let i in plans){
    let date = moment(plans[i].dateTime.toDate())
    let weekStart = moment(date.startOf('isoWeek'))
    let weekEnd = moment(date.endOf('isoWeek'))

    if(planWeek[weekStart] == undefined){
      planWeek[weekStart] = {
        weekEnd : weekEnd,
        hours : plans[i].hours
      }
    }
    else{
      planWeek[weekStart].hours += plans[i].hours
    }
  }

  for(let i in times){
    let date = moment(times[i].dateTime.toDate())
    let weekStart = moment(date.startOf('isoWeek'))
    let weekEnd = moment(date.endOf('isoWeek'))

    if(timesWeek[weekStart] == undefined){
      timesWeek[weekStart] = {
        weekEnd : weekEnd,
        hours : times[i].time
      }
    }
    else{
      timesWeek[weekStart].hours += times[i].time
    }
  }
  return {  
    plans : planWeek,
    done: timesWeek,
    week : [...new Set(Object.keys(planWeek).concat(Object.keys(timesWeek)))]
  }

}

export { db , app , auth ,
   dbAdd, dbUpdate, dbAddComment, dbAddRating, dbGetComments, 
   dbAddStatus, dbAddTime, dbAddTimePlanned,
  dbGetStatus, dbGetUserStatuses, dbGetRating, dbGetUserRatings,
   dbGetReadBooks, dbGetTimes, dbGetUserTimes, dbGetUserTimesPlanned, GetPlanningStats }