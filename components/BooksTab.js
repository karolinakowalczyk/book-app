import { View, Text} from "react-native";
import Book from '../components/Book';
import { useEffect } from "react";
import React, { useState } from 'react';
import { Colors, Title } from "react-native-paper";
import {Link } from "react-router-native";
import { getRandomBooks, search } from "../OpenLibraryAPI";
import { ActivityIndicator} from 'react-native-paper';

const loadBooks = async (bookType, page=1, itemsPerPage=3) => {
    const books = await search('subject', bookType, itemsPerPage, page);
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

const BooksTab = (props) => {
    const [books, setBooks] = useState();
    useEffect(() => {
        async function fetchBooks() {
          let response = await loadBooks(props.bookType);
          setBooks(response);
        }
        fetchBooks()
      }, [])


    const tabName = props.name;
    const bookType = props.bookType;
    return ( 
    <View style={{marginTop: 20, width: '100%', height: 240}} >
    <Title style={{marginLeft: 10, color: Colors.purple800}}>
        {tabName}
    </Title>
    <View style={{ flexDirection: 'row', marginTop: 10 }} >
        {books? books : <ActivityIndicator animating={true} color={Colors.red800} />}
    </View>
</View>) 
        
    }

export default BooksTab;