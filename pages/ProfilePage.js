import { StyleSheet, View, Text, Banner } from "react-native";
import React from 'react';
import BackButton from "../components/BackButton";
import { Avatar, Colors, Button } from 'react-native-paper';


const ProfilePage = () => {
    return (
    <View style={[styles.profileContainer, {
      flexDirection: "column"
    }]}>
        <BackButton />
        <View style={styles.row}>
            <Avatar.Image size={120} source={require('../assets/images/reading.png')}  style={styles.profileImg} />
            <View style={styles.column}>
                <Text style={{color: Colors.purple900, fontSize: 36}}>Anna Nowak</Text>
                <Text style={{ color: Colors.grey600, fontSize: 16, marginTop: 5 }}>Total reading time: 210 h</Text>
            </View>
            </View>
            <Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 5, paddingLeft: 20 }}>You read 20 books! </Text>
            <Button mode="contained" style={styles.changePassBtn}>
                <Text style={styles.changePassBtnText}>ZMIEŃ HASŁO</Text>
            </Button>
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
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40
    },
    changePassBtnText: {
        
    }
});

  export default ProfilePage;