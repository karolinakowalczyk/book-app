import fetch from "node-fetch"

const numBooks = 35300005
const query = {
    'book_data_M': 'https://openlibrary.org/editions/OL`M.json',
    'book_data_I': 'https://openlibrary.org/isbn/`.json',
    'search': 'http://openlibrary.org/search.json?`'
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

async function getBook(id, mode='M'){                           // Mode=['M', 'I'] -> M => book id (OLID); I => ISBN
    return fetch(parseQuery('book_data_'+mode, id))  
        .then(response => response.json())
}

async function getRandomBooks(num=20){
    var numbers = getRandomInt(num=num)
    var promises = []

    for(var i in numbers){
        promises.push(getBook(i))
    }

    return await Promise.all(promises)
}

async function search(query){
    var request = ''
    let q = Object.entries(query)
    
    for(let i in q){
        request += `${q[i][0]}=${q[i][1]}&`
    }
    
    if(request=='') throw new Error('No parameters provided.')
    
    return fetch(parseQuery('search', request)).then(response => response.json())
}



//console.log(await getRandomBooks())
//console.log(await getBook(9780140328721, 'I'))
console.log(await search({'q': 'Tolkien'}))