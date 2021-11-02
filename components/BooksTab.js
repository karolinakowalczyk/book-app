import { View, Text} from "react-native";
import Book from '../components/Book';
import React from 'react';
import { Colors, Title } from "react-native-paper";


const loadBooks = (bookType, amount, page=1, itemsPerPage=3) => {
    const books = [];
    for (let i=0; i < itemsPerPage; i++) {
        //TO DO: add book props or maybe rewrite whole function
        books.push(<View key={i} style={{flex: 0.4, alignItems: 'center'}}><Book /></View>)
    }
    return books;
}

const BooksTab = (props) => {
    const tabName = props.name;
    return ( 
    <View style={{marginTop: 20, width: '100%', height: 240}} >
    <Title style={{marginLeft: 10, color: Colors.purple800}}>
        {tabName}
    </Title>
    <View style={{ flexDirection: 'row', marginTop: 10 }} >
        {loadBooks()}
    </View>
</View>)
}

export default BooksTab;