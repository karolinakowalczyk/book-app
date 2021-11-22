import { View, Text} from "react-native";
import Book from '../components/Book';
import React from 'react';
import { Colors, Title } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import BooksTab from '../components/BooksTab';
import FilteredBooksPage from "./FilteredBooksPage";


const HomePage = () => {
    const [filteredBooksPage, setFilteredBooksPage] = React.useState(false);
    const [filterValues, setFilterValues] = React.useState(['','','','','','']);
    const setFilters = (newFilterValues) => {
        setFilterValues(newFilterValues);
        setFilteredBooksPage(true);
    }

    if (!filteredBooksPage) {
    return (
        <View style={{width: '100%', height: '100%', backgroundColor: Colors.grey200}}>
            <SearchBar setFilters={setFilters}/>
            <BooksTab name="Popular" filterType={["subject"]} filterValue="Congresses" />
            <BooksTab name="For you" filterType={["subject"]} filterValue="Biography" />
        </View>
    );
    } else {
        return <FilteredBooksPage filterValue={filterValues} />
    }
  };

  export default HomePage;