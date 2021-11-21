import { View, Text} from "react-native";
import Book from '../components/Book';
import React from 'react';
import { Colors, Title } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import BooksTab from '../components/BooksTab';


const HomePage = () => {
    return (
        <View style={{width: '100%', height: '100%', backgroundColor: Colors.grey200}}>
            <SearchBar />
            <BooksTab name="Popular" bookType="Congresses" />
            <BooksTab name="For you" bookType="Biography" />
        </View>
    );
  };

  export default HomePage;