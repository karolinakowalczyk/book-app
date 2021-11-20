import { StyleSheet, View, Text, FlatList } from "react-native";
import React from 'react';
import BackButton from "../components/BackButton";
import { Button } from 'react-native-paper';
import Book from "../components/Book"

const UserBooksPage = () => {
  const [btnSelected, setBtnSelected] = React.useState(1);
  const loadInProgressBooks = (bookType, amount, page=1, itemsPerPage=6) => {
    const books = [];
    //jakiś if że w trakcie
    for (let i=0; i < itemsPerPage; i++) {
        //TO DO: add book props or maybe rewrite whole function
      books.push(<View key={i} style={{ flexBasis: '30%', alignItems: 'center', margin: 2}}><Book /></View>)
    }
    return books;
  }

  const loadInReadBooks = (bookType, amount, page=1, itemsPerPage=6) => {
    const books = [];
    //jakiś if że przeczytane
    for (let i=0; i < itemsPerPage; i++) {
        //TO DO: add book props or maybe rewrite whole function
      books.push(<View key={i} style={{ flexBasis: '30%', alignItems: 'center', margin: 2}}><Book /></View>)
    }
    return books;
  }

  const loadInPlannedBooks = (bookType, amount, page=1, itemsPerPage=6) => {
    const books = [];
    //jakiś if że planowane
    for (let i=0; i < itemsPerPage; i++) {
        //TO DO: add book props or maybe rewrite whole function
      books.push(<View key={i} style={{ flexBasis: '30%', alignItems: 'center', margin: 2}}><Book /></View>)
    }
    return books;
  }

  const loadMoreBooks = () => {
    
    
  }
    return (
      <View style={[styles.userBooksContainer, {
      flexDirection: "column"
    }]}>
        <BackButton />
          <View style={styles.row}>
            <Button
              mode={(btnSelected === 1) ? "contained" : "outlined"}
              onPress={() => setBtnSelected(1)}
            >
              <Text>W TRAKCIE</Text>
            </Button>
            <Button
              mode={(btnSelected === 2) ? "contained" : "outlined"}
              onPress={() => setBtnSelected(2)}
            >
              <Text>PRZECZYTANE</Text>
            </Button>
            <Button
              mode={(btnSelected === 3) ? "contained" : "outlined"}
              onPress={() => setBtnSelected(3)}
            >
              <Text>PLANOWANE</Text>
            </Button>
        </View>
        {btnSelected === 1 &&
          <View style={{ flexDirection: 'row', marginTop: 20, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
          {loadInProgressBooks()}
          </View>
        }
        {btnSelected === 2 &&
          <View style={{ flexDirection: 'row', marginTop: 20, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
            {loadInReadBooks()}
          </View>
        }
        {btnSelected === 3 &&
          <View style={{ flexDirection: 'row', marginTop: 20, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
            {loadInPlannedBooks()}
          </View>
        }
        <Button onPress={loadMoreBooks()} style={{marginTop: 60, marginBottom: 5, marginLeft: 23, marginRight: 23}} mode="contained">LOAD MORE</Button>
    </View>
    );
  };
const styles = StyleSheet.create({
  userBooksContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20
    },
    column: {
        flexDirection: 'column',
       
    },
});
export default UserBooksPage;