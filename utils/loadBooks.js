import { View, Text} from "react-native";
import Book from '../components/Book';
import React, { useState } from 'react';
import {Link } from "react-router-native";
import {search} from "../OpenLibraryAPI";



export default loadBooks = async (filterType, filterValue, page=1, itemsPerPage=3) => {
    const books = await search(filterType, filterValue, itemsPerPage, page);
    console.log(books.docs);
    const booksComponents = [];
    let elementsAmount = itemsPerPage;

    if (books.docs.length < itemsPerPage) {
        elementsAmount = books.docs.length;
    }
    for (let i=0; i < elementsAmount; i++) {
        
        const key = books.docs[i].key ? books.docs[i].key : undefined;
    
        const authorName = typeof books.docs[i].author_name === Array ? books.docs[i].author_name[0] : (books.docs[i].author_name ? books.docs[i].author_name : 'Author unknown');
    
        //TO DO: add book props or maybe rewrite whole function
        booksComponents.push(
        <View key={i} style={{flexBasis: '33%', alignItems: 'center', marginTop: 10}}>
            <Link to={`/book-details/${key}/${authorName}`}>
                <Book book={books.docs[i]}/>
            </Link>
        </View>
        )
    }
    return booksComponents;
}