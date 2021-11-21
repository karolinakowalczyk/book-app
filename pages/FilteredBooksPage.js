import { View, Text} from "react-native";
import Book from '../components/Book';
import React from 'react';
import { Colors, Title } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import BooksTab from '../components/BooksTab';
import loadBooks from "../utils/loadBooks";


const FilteredBooksPage = (props) => {
    const filterType = props.filterType;
    const filterValue = props.filterValue;
    
    return (
        <View style={{width: '100%', height: '100%', backgroundColor: Colors.grey200}}>
            <SearchBar />
            
        </View>
    );
  };

  export default FilteredBooksPage;