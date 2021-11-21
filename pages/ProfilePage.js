import { StyleSheet, View, Text, Banner } from "react-native";
import React from 'react';
import BackButton from "../components/BackButton";
import { Avatar, Colors, Button, IconButton } from 'react-native-paper';
import Book from "../components/Book";
import LoadMore from "../components/LoadMore";


const ProfilePage = () => {
    const loadInFavouriteBooks = (bookType, amount, page = 1, itemsPerPage = 3) => {
        //pobranie z bazy ulubionych książek
    const books = [];
    for (let i=0; i < itemsPerPage; i++) {
        //TO DO: add book props or maybe rewrite whole function
      books.push(<View key={i} style={{ flexBasis: '30%', alignItems: 'center', margin: 2}}><Book /></View>)
    }
    return books;
    }
    const loadMore = () => {
        
    }
    const comeBack = () => {
    
    }
    return (
    <View style={[styles.profileContainer, {
      flexDirection: "column"
    }]}>
        <BackButton />
        <View style={styles.row}>
            <Avatar.Image size={120} source={require('../assets/images/reading.png')}  style={styles.profileImg} />
            <View style={styles.column}>
                <Text style={{color: Colors.purple900, fontSize: 36}}>Anna Nowak</Text>
                <Text style={{ color: Colors.grey600, fontSize: 16, marginTop: 5 }}>Całkowity czas czytania: 210 h</Text>
            </View>
        </View>
        <Button mode="contained" style={styles.changePassBtn}>
            <Text style={styles.changePassBtnText}>ZMIEŃ HASŁO</Text>
        </Button>
        <Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 10, paddingLeft: 20 }}>Przecztałeś/aś już 20 książek! </Text>
        
        <Text style={{color: Colors.purple900, fontSize: 24, marginTop: 10, paddingLeft: 20}}>Twoje ulubione książki:</Text>
        <View style={{ flexDirection: 'row', marginTop: 20, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
            {loadInFavouriteBooks()}
        </View>
        <LoadMore></LoadMore>
            
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