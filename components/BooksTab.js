import { View, Text} from "react-native";
import Book from '../components/Book';
import { useEffect } from "react";
import React, { useState } from 'react';
import { Colors, Title } from "react-native-paper";
import {Link } from "react-router-native";
import {search} from "../OpenLibraryAPI";
import { ActivityIndicator} from 'react-native-paper';
import loadBooks from "../utils/loadBooks";

const BooksTab = (props) => {
    const tabName = props.name;
    const filterType = props.filterType;
    const page = props.page;
    const limit = props.limit;
    const filterValue = props.filterValue;
    const [books, setBooks] = useState();

    useEffect(() => {
        async function fetchBooks() {
          let response = await loadBooks(filterType, filterValue);
          setBooks(response);
        }
        fetchBooks()
      }, [])

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