import { mdiConsoleNetwork } from "@mdi/js"
import fetch from "node-fetch"

const numBooks = 24999653
const query = {
    'book_data_M': 'https://openlibrary.org/editions/`.json',
    'book_data_W': 'https://openlibrary.org/works/`.json',
    'author': 'https://openlibrary.org/authors/`.json',
    'search': 'http://openlibrary.org/search.json?`',
    'image': 'https://covers.openlibrary.org/b/OLID/$value-$size.jpg',
    'cover': 'https://covers.openlibrary.org/b/id/$value-$size.jpg'
}
const importantKeys = [
    'key',
    'title',
    'edition_key',
    'author_key',
    'author_name',
    'subject',
    'subject_key',
    'description',
    'cover,'
]

const importantKeysWork = [
    'key',
    'title',
    'subjects',
    'authors',
    'covers',
    'description'
]

const importantKeysEdition = [
    'key',
    'subjects',
    'series',
    'publishers',
    'authors',
    'isbn_10',
    'isbn_13',
    'genres',
    'publish_date',
    'title'
]

const importantKeysAuthor = [
    'name',
]

async function getAuthor(id, fullData=false, keys=importantKeysAuthor){
    let data = await fetch(parseQuery('author', id)).then(response => response.json())
    if(!fullData) data = fetchMostImportantData(data, keys)
    return data
}

function fetchMostImportantData(data, keys){
    let parsed = {}
    for(let i in keys) parsed[keys[i]] = data[keys[i]]
    return parsed
}

function parseQuery(q, insert){
    return query[q].replace('`', insert)
}

function getRandomInt(num=1, min=1, max=numBooks){
    var result = []

    for(var i=0;i<num;++i){
        var min = Math.ceil(min)
        var max = Math.floor(max)
        var rand = Math.floor(Math.random() * (max - min + 1)) + min
        if(!result.includes(rand)) result.push(rand) 
    }
    return result
}

async function getBook(id, fullData=false, keys=importantKeysWork){                           
    let data = await fetch(parseQuery('book_data_W', id))  
                        .then(response => response.json())
    
    let normalizedData = fetchMostImportantData(data, importantKeys)
    normalizedData.edition = data.edition
    normalizedData.description = data.description
    
    normalizedData.author_name = []
    normalizedData.author_key = []

    for(let i in data.authors){
        normalizedData.author_key.push('OL' + data.authors[i].author.key.split('OL')[1])
        normalizedData.author_name.push((await getAuthor('OL' + data.authors[i].author.key.split('OL')[1]))['name'])
    }

    normalizedData.subject = data.subjects
    try {
    normalizedData.cover = await getImageUrlByCoverId(data.covers[0])
    } catch {}

    return normalizedData
}

async function getEdition(id, fullData=false, keys=importantKeysEdition){                           
    let data = await fetch(parseQuery('book_data_M', id))  
                        .then(response => response.json())
    if (!fullData) data = fetchMostImportantData(data, keys)
    return data
} 

async function getRandomBooks(num=20, fullData=false, keys=importantKeys){
    var numbers = getRandomInt(num=num)
    var promises = []

    for(var i in numbers){
        promises.push(getBook('OL' + numbers[i] + 'W', fullData, keys))
    }

    return await Promise.all(promises)
}

/*
USAGE
***
filter - string / array of strings
value - string / array of [strings or arrays of strings]

Skomplikowane, ale:

1. filter: string, value: string => pojedynczy filtr szukający wszystkiego co w tym polu ma value; np. 'title', 'lord' szuka wsystkich książek z 'lord' w tytule
2. filter: string, value: arr[str] => pojedynczy filtr szukający wszystkiego co w tym polu ma value[0] ORAZ value[1] itd.; np. 'title', ['lord of', 'rings'] wyszuka wszystko co w tytule zawiera na dowolnych pozycjach stringi 'lord of' (nierozłączne) oraz 'rings'
3. filter: arr[str], value: arr[str] => wiele filtrów i odpowiadające im pojedyncze wartości; np. ['title', 'author'], ['lord', 'tolkien'] wyszuka wszystkie tytuły co mają w tytule 'lord', a autor ma w nazwie 'tolkien'
4. filter: arr[str], value: arr[arr[str]] => jak w 2., tylko wiele filtrów jak w 3.

3 i 4 mogą być wymieszane w value, np. ['tolkien', ['lord of', 'rings']]
***
FILTERS
***
title
author
subject
place
person
language => 3 pierwsze litery angielsiej nazwy języka (spa, eng, pol itd.); WYJĄTKI - japoński = jpn; wiele języków = mul; undetermined = und
publisher
***
*/

async function search(filter, value, limit=20, page=1, fullData=false, keys=importantKeys){
    let request = ''
    if(Array.isArray(filter)) 
        for(let i in filter){
            if(Array.isArray(value)){
                if(Array.isArray(value[i])) request += filter[i] + '=' + value[i].join('+') + '&'
                else request += filter[i] + '=' + value[i] + '&'
            }
            else request += filter[i] + '=' + value + '&'
        }

    else {
        if(Array.isArray(value)) request = filter + '=' + value.join('+') + '&'
        else request = filter + '=' + value + '&'
    }
    request += 'page=' + page + '&limit=' + limit
    request = parseQuery('search', request)
    console.log(request)

    let data = await fetch(request).then(response => response.json())
    if (!fullData) for (let entry in data.docs) {
        data.docs[entry] = fetchMostImportantData(data.docs[entry], keys)
        
        let temp = data.docs[entry].key.split('/')
        data.docs[entry].key = temp[temp.length - 1]

        data.docs[entry].cover = await getImageUrl(data.docs[entry].edition_key[0])
    }

    return data
}

async function getImageUrl(id, size='M'){
    return query['image'].replace('$value', id).replace('$size', size)
}

async function getImageUrlByCoverId(id, size='M'){
    return query['cover'].replace('$value', id).replace('$size', size)
}


//await search({query: 'Tolkien', limit: 1, page: 10})
console.log(await getRandomBooks(2))
//console.log(await getImageUrl('OL7353617M'))
//console.log((await search(['title', 'author'], ['Lord of', ['J', 'tolkien']])))

/*
TODO
search(filter, value, page=1, limit=20)
Work ID + pierwsze wydanie
imageurl w search
*/