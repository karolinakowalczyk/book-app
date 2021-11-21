import { View, Text} from "react-native";
import Book from '../components/Book';
import React, { useState } from 'react';
import {Link } from "react-router-native";
import {search} from "../OpenLibraryAPI";

export default loadBooks = async (filterType, filterValue, page=1, itemsPerPage=3) => {
    const books = await search(filterType, filterValue, itemsPerPage, page);
    
    const booksComponents = [];

    for (let i=0; i < itemsPerPage; i++) {
        //TO DO: add book props or maybe rewrite whole function
        booksComponents.push(
        <View key={i} style={{flex: 0.4, alignItems: 'center'}}>
            <Link to="/book-details">
                <Book book={books.docs[i]}/>
            </Link>
        </View>
        )
    }
    return booksComponents;
}