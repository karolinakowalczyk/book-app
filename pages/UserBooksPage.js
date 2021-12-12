import { StyleSheet, View, Text, FlatList } from "react-native";
import React, { useEffect } from 'react';
import BackButton from "../components/BackButton";
import { Button } from 'react-native-paper';
import Book from "../components/Book"
import LoadMore from "../components/LoadMore"
import { db, auth } from "../firebase";
import { Link } from "react-router-native";

const UserBooksPage = () => {

  const [btnSelected, setBtnSelected] = React.useState(1);
  const [books, setBooks] = React.useState([]);
  const [comeBackDisabled, setComeBackDisabled] = React.useState(true);
  const [loadMoreDisabled, setLoadMoreDisabled] = React.useState(false);
  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    const checkUserFavourites = async () => {
      const booksFetched = [];
      // let collectionName = "favourite-books";
      // if (btnSelected === 1) {
      //   collectionName = 
      // }
      await db.collection("favourite-books")
      .where("user_id", "==", auth.currentUser.uid)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
              booksFetched.push(doc.data());
          })
      });
      if (booksFetched.length > offset + 3) {
        setLoadMoreDisabled(false);
    } 
    else {
        setLoadMoreDisabled(true);
    }
      setBooks(booksFetched);
      console.log(books[0])
  };
  
  checkUserFavourites();
  }, [])

  const loadMore = () => {
    setOffset(offset + 3)
    setComeBackDisabled(false);
}
const comeBack = () => {
    if (offset >= 3) {
        setOffset(offset - 3)
    }
    setComeBackDisabled(true);
}


  const loadInProgressBooks = (bookType, amount, page=1, itemsPerPage=6) => {
    const booksJSX = [];
    //jakiś if że w trakcie
    let elementsAmount = itemsPerPage;
    if (books.length < itemsPerPage) {
      elementsAmount = books.length;
    }
    
    for (let i=0; i < elementsAmount; i++) {
        //TO DO: add book props or maybe rewrite whole function
      booksJSX.push(
        <View style={{flexBasis: '33%', alignItems: 'center', marginTop: 10}}>
          <Link  to={`/book-details/`}>
            <Book book={books[i]}/>
          </Link>
        </View>
      )
    }
    return booksJSX;
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
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 25, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
          {loadInProgressBooks()}
          </View>
        }
        {btnSelected === 2 &&
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 25, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
            {/* {loadInReadBooks()} */}
            {loadInProgressBooks()}
          </View>
        }
        {btnSelected === 3 &&
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 25, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
            {/* {loadInPlannedBooks()} */}
            {loadInProgressBooks()}
          </View>
        }
        <LoadMore comeBackDisabled={comeBackDisabled} loadMoreDisabled={loadMoreDisabled} comeBack={comeBack} loadMore={loadMore}></LoadMore>
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