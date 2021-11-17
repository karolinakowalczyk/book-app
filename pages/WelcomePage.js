import { Avatar, Button  } from "react-native-paper";
import {Link } from "react-router-native";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
const WelcomePage = () => {

  return (
      <View style={styles.container}>
        <Avatar.Image size={300} source={require('../assets/images/reading.png')} style={styles.image} />
        <Text style={styles.infoMain}>Book app</Text>
        <Link to="/login">
          <Button mode="contained" style={styles.subBtn}>
            <Text style={styles.subBtnText}>ZALOGUJ SIĘ</Text>
          </Button>
        </Link>
        <Link to="/register">
          <Button mode="contained" style={styles.subBtn}>
            <Text style={styles.subBtnText}>ZAREJESTRUJ SIĘ</Text>
          </Button>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: '#d7e0ff',
      justifyContent: 'center',
    },
  image: {
      marginTop: 50,
  },
  infoMain: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 46,
    letterSpacing: 0.2,
    marginTop: 50
  },
  subBtn: {
    marginTop: 50,
    width: 300,
  },
  subBtnText: {
     fontSize: 24,
  }
});

  
export default WelcomePage;