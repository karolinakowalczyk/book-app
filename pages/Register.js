import React from "react";
import { auth, dbAdd, dbAddComment, dbGetComments, dbGetReadBooks, dbAddStatus } from "../firebase.js";
import { Redirect, Link } from "react-router-native";
import { TextInput, Button } from "react-native-paper";
import { View, Text,StyleSheet } from "react-native";

import BottomNav from '../components/BottomNav';
// import MyContext from "../Context";

import BackButton from "../components/BackButton";

const Register = () => {
  const labels = ["Imię", "Nazwisko", "Email", "Hasło"];
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  const [redirect, setRedirect] = React.useState(false);
//   const { currentUser, setCurrentUser } = React.useContext(MyContext);
  const handleInput = (text, index) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };
  const createUser = () => {
    const data = {
      today: new Date(),
      valueDB: 240
    }
    
    // dbAdd('users', 'user1', data);
    //dbAddComment("user", "book", "this book sucks")
    //let z = dbGetReadBooks("userID")
    //dbAddStatus("user1", "book1", "reading")
    //dbAddComment("user1", "bbok1", "This book rocks")
    let z = dbGetComments("bbok1").then((data) => console.log(data))
    console.log(z)

    
    if (!values.every((el) => el !== null)) return;
    auth
      .createUserWithEmailAndPassword(values[2], values[3])
      .then(() => {
        auth
          .signInWithEmailAndPassword(values[2], values[3])
          .then((loggedUser) => {
            loggedUser.user.updateProfile({
              displayName: `${values[0]} ${values[1]}`,
            });
             //setCurrentUser(loggedUser);
          })
          .catch((err) => {
            console.log(err);
            setRedirect(false);
          });
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        setRedirect(false);
      })

  };
  const InputCreate = () => {
    const renderInputs = labels.map((el, index) => {
      return (
        <View style={styles.itemReady} key={index}>
            {index == 3 &&
                <TextInput
                value={values[index]}
                onChangeText={(text) => handleInput(text, index)}
                id={el}
                label={el}
                secureTextEntry={true}
              />
            }
            {index !=3 && <TextInput
              value={values[index]}
              onChangeText={(text) => handleInput(text, index)}
              id={el}
              label={el}
            />}
        </View>
      );
    });
    return renderInputs;
  };
  if (redirect) {
    return <BottomNav />;
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