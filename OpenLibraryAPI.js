import { mdiConsoleNetwork } from "@mdi/js"
import fetch from "node-fetch"

const numBooks = 35300005
const query = {
    'book_data_M': 'https://openlibrary.org/editions/OL`M.json',
    'search': 'http://openlibrary.org/search.json?`',
    'image': 'https://covers.openlibrary.org/b/OLID/$value-$size.jpg'
}
const importantKeys = [
    'key',
    'title',
    'edition_key',
    'author_key',
    'author_name',
    'subject',
    'subject_key',
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

async function getBook(id, fullData=false, keys=importantKeysEdition){                           
    let data = await fetch(parseQuery('book_data_M', id))  
                        .then(response => response.json())
    if (!fullData) data = fetchMostImportantData(data, keys)
    return data
}

async function getRandomBooks(num=20, fullData=false, keys=importantKeysEdition){
    var numbers = getRandomInt(num=num)
    var promises = []

    for(var i in numbers){
        promises.push(getBook(numbers[i], fullData, keys))
    }

    return await Promise.all(promises)
}

/*
    query - ambiguous string to search
    name - filter book titles
    author - filter author names
    page - page number to show
    limit - entry limit per page
*/
async function search({query='', name='', author='', page=1, limit=20, fullData=false, keys=importantKeys}={}){
    var request = ''
    
    if(query != '') request += `q=${query}&`
    if(name != '') request += `name=${name}&`
    if(author != '') request += `author=${author}&`
    if(page > 1 && Number.isInteger(page)) request += `page=${page}&`
    
    if(request=='') throw new Error('No parameters provided.')
    request += `limit=${limit}`

    console.log(parseQuery('search', request))
    let data = await fetch(parseQuery('search', request)).then(response => response.json())
    if (!fullData) for (let entry in data.docs) data.docs[entry] = fetchMostImportantData(data.docs[entry], keys)
    return data
}

async function getImageUrl(key, size='S'){
    return query['image'].replace('$value', key).replace('$size', size)
}

//await search({query: 'Tolkien', limit: 1, page: 10})
//console.log(await getRandomBooks(2))
//console.log(await getImageUrl('OL7353617M'))
//console.log((await search({query: 'Tolkien', limit: 1, page: 15})))