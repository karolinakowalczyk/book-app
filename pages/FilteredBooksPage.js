import { View, Text} from "react-native";
import Book from '../components/Book';
import React from 'react';
import { Colors, Title } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import BooksTab from '../components/BooksTab';
import loadBooks from "../utils/loadBooks";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import BackButton from "../components/BackButton";
import { IconButton} from 'react-native-paper';


const FilteredBooksPage = (props) => {
    const filterType = ['title', 'author', 'subject', 'place', 'person', 'publisher']
    const [page, setPage] = React.useState(1);
    const [books, setBooks] = React.useState();
    const filterValue = props.filterValue;

    const incrementPage = () => {
        setBooks(undefined);
        setPage(page+1);
    }
    const decrementPage = () => {
        if (page !== 1) {
            setBooks(undefined);
            setPage(page - 1);
        }
    }

    useEffect(() => {
        async function fetchBooks() {
          const existingFilterTypes = filterType.filter((el, idx) => filterValue[idx] !== '');
          const existingFilterValues = filterValue.filter(el => el !== '');
          let response = await loadBooks(existingFilterTypes, existingFilterValues, page, 15);
          setBooks(response);
        }

        fetchBooks()
      }, [page])

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{width: '100%', height: '100%', backgroundColor: Colors.grey200}}>
                    <SearchBar />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }} >
                        {books? books : <ActivityIndicator animating={true} color={Colors.red800} />}
                    </View>
                    <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
                        <IconButton
                            icon="arrow-left"
                            color={Colors.deepPurple500}
                            size={20}
                            onPress={decrementPage}
                        />
                        <IconButton
                            icon="arrow-right"
                            color={Colors.deepPurple500}
                            size={20}
                            onPress={incrementPage}
                        />
                    </View>
                    <BackButton link="/main/home"/>
                </View>
            </ScrollView>
      </SafeAreaView>
        
    );
  };

  export default FilteredBooksPage;