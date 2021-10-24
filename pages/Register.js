import React from "react";
// import { auth } from "../firebase";
import { Redirect, Link } from "react-router-native";
import { TextInput, Button } from "react-native-paper";
import { View, Text,StyleSheet } from "react-native";
// import MyContext from "../Context";

import BackButton from "./BackButton";

const Register = () => {
  const labels = ["Imię", "Nazwisko", "Email", "Hasło"];
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  const [redirect, setRedirect] = React.useState(false);
//   const { currentUser, setCurrentUser } = React.useContext(MyContext);
  const handleInput = (event) => {
    const idx = event.target.getAttribute("name");
    const newValues = [...values];
    newValues[idx] = event.target.value;
    setValues(newValues);
  };
  const createUser = () => {
    // if (!values.every((el) => el !== null)) return;
    // auth
    //   .createUserWithEmailAndPassword(values[1], values[3])
    //   .then(() => {
    //     auth
    //       .signInWithEmailAndPassword(values[1], values[3])
    //       .then((loggedUser) => {
    //         loggedUser.user.updateProfile({
    //           displayName: `${values[0]} ${values[2]}`,
    //         });
    //         // setCurrentUser(loggedUser);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     setRedirect(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const InputCreate = () => {
    const renderInputs = labels.map((el, index) => {
      return (
        <View style={styles.itemReady} key={index}>
            <TextInput
              value={values[index]}
              onInput={handleInput}
              id={el}
              label={el}
            />
        </View>
      );
    });
    return renderInputs;
  };
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <View style={styles.containerRegister}>
      <BackButton/>
      <View style={styles.box}>
        <Text style={styles.infoMain}>Book app</Text>
        <Text style={styles.infoSub}>Rejestracja</Text>
        <View style={styles.smallContainerRegister}>{InputCreate()}</View>
        <Link
          to="/login"
          exact
          style={styles.subBtn}
        ><Text>
          Kliknij tu by się zalogować
          </Text>
        </Link>
        <View>
          <Button
          color="blue"
            onPress={createUser}
            mode="outlined"
          >
            Zarejestruj się
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    containerRegister: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      },
      smallContainerRegister: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
        width: '90%',
      },
      inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      infoMain: {
        fontSize: 36,
        fontWeight: 'bold',
        lineHeight: 46,
        letterSpacing: 0.2,
        marginTop: 50,
      },
      infoSub: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 34,
        letterSpacing: 0.2,
      },
      box: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '95%',
        height: '85%',
        backgroundColor: '#d7e0ff',
        borderRadius: 30,
      },
      itemReady: {
        flexBasis: '100%',
        marginBottom: 5,
        justifyContent: 'center',
      },
      subBtn: {
        alignSelf: 'center',
        marginBottom: 20,
        fontSize: 13,
        color: 'gray',
        textDecorationLine: 'underline',
      },
})
export default Register;