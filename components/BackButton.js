import { Button, TextInput } from "react-native-paper";
import {Link, Redirect } from "react-router-native";
import { StyleSheet } from "react-native";

import React from "react";
const BackButton = () => {
  //jeżeli user zalogowany to niech przenosi to="/home"
  return (
    <Link
        to="/"
        exact
        style={styles.subBtn}
    ><Button icon="arrow-left-bold-circle-outline">
        Wróć
        </Button>
    </Link>
  );
};

const styles = StyleSheet.create({
      subBtn: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 13,
        color: 'gray',
        textDecorationLine: 'underline',
      },
  });

  
export default BackButton;