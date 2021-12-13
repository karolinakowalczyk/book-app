import { StyleSheet, View, Text, Banner } from "react-native";
import React from 'react';
import BackButton from "../components/BackButton";
import { useEffect } from "react";

import { auth, db } from "../firebase.js"; 
import { Avatar, Colors } from 'react-native-paper';
import Book from "../components/Book";
import LoadMore from "../components/LoadMore";
import { Link } from "react-router-native";


const ProfilePage = () => {
    const [favBooks, setFavBooks] = React.useState([]);
    const [comeBackDisabled, setComeBackDisabled] = React.useState(true);
    const [loadMoreDisabled, setLoadMoreDisabled] = React.useState(false);
    const [offset, setOffset] = React.useState(0);
    

    useEffect(() => {
    let tempFavBooks = [];
    db.collection("favourite-books")
    .where("user_id", "==", auth.currentUser.uid)
    .get()
    .then((querySnapshot) => {
        let index = 0;
        querySnapshot.forEach(doc => {
            index++;
            const bookData = doc.data();
                tempFavBooks.push(
                <View key={index} style={{flexBasis: '33%', alignItems: 'center', marginTop: 10}}>
                    <Link key={index} to={`/book-details/${bookData.book_id}/${bookData.author_name}`}>
                        <Book key={index} book={bookData}/>
                    </Link>
                </View>);
        });
        if (tempFavBooks.length > offset + 3) {
            setLoadMoreDisabled(false);
        } 
        else {
            setLoadMoreDisabled(true);
        }

        tempFavBooks = tempFavBooks.slice(offset, offset + 3);

        setFavBooks(tempFavBooks);  
    });
    
    }, [offset])
          
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
    return (
    <View style={[styles.profileContainer, {
      flexDirection: "column"
    }]}>
        <BackButton />
        <View style={styles.row}>
            <Avatar.Image size={100} source={require('../assets/images/reading.png')}  style={styles.profileImg} />
            <View style={styles.column}>
                <Text style={{color: Colors.purple900, fontSize: 36}}>{ auth.currentUser.displayName }</Text>
                <Text style={{ color: Colors.grey600, fontSize: 16, marginTop: 5 }}>Całkowity czas czytania: 210 h</Text>
            </View>
        </View>
        <Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 10, paddingLeft: 20 }}>Przecztałeś/aś już 20 książek! </Text>
        
        <Text style={{color: Colors.purple900, fontSize: 24, marginTop: 20, paddingLeft: 20}}>Twoje ulubione książki:</Text>
        <View style={{ flexDirection: 'row', marginTop: 45, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
            {favBooks}
        </View>
        <LoadMore  comeBackDisabled={comeBackDisabled} loadMoreDisabled={loadMoreDisabled} comeBack={comeBack} loadMore={loadMore}/>
            
    </View>
           
    );
  };

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        marginTop: 20
    },
    profileImg: {
        margin: 20,
    },
    changePassBtn: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40
    },
    changePassBtnText: {
        
    }
});

  export default ProfilePage;