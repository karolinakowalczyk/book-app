import { mdiConsoleNetwork } from "@mdi/js"
import fetch from "node-fetch"

const numBooks = 35300005
const query = {
    'book_data_M': 'https://openlibrary.org/editions/OL`M.json',
    'book_data_I': 'https://openlibrary.org/isbn/`.json',
    'search': 'http://openlibrary.org/search.json?`'
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

// Mode=['M', 'I'] -> M => book id (OLID); I => ISBN
async function getBook(id, mode='M', fullData=false, keys=importantKeysEdition){                           
    let data = await fetch(parseQuery('book_data_'+mode, id))  
                        .then(response => response.json())
    if (!fullData) data = fetchMostImportantData(data, keys)
    return data
}

async function getRandomBooks(num=20){
    var numbers = getRandomInt(num=num)
    var promises = []

    for(var i in numbers){
        promises.push(getBook(i))
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


//await search({query: 'Tolkien', limit: 1, page: 10})
//console.log(await getRandomBooks())
//console.log(await getBook(9780140328721, 'I'))
//console.log((await search({query: 'Tolkien', limit: 1, page: 15})))