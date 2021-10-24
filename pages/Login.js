import { Button, TextInput } from "react-native-paper";
import {Link, Redirect } from "react-router-native";
import { StyleSheet, View, Text } from "react-native";
import React from "react";
// import { auth } from "./../firebase";
// import MyContext from "./../Context";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  // const { currentUser, setCurrentUser } = React.useContext(MyContext);

  const login = () => {
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((loggedUser) => {
    //     // console.log(loggedUser);
    //     // setCurrentUser(loggedUser.user.uid);
    //     // console.log(currentUser);
    //     setRedirect(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <View style={styles.authView}>
      <View style={styles.containerLogin}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={styles.infoMain}>Book app</Text>
          <Text style={styles.infoSub}>Logowanie do systemu</Text>
        </View>

        <View
          style={{
            marginTop: 43,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextInput
            name="email"
            type="text"
            variant="outlined"
            placeholder="E-mail"
            onInput={(e) => setEmail(e.target.value)}
            value={email}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            name="hasło"
            type="password"
            variant="outlined"
            placeholder="Hasło"
            onInput={(e) => setPassword(e.target.value)}
            value={password}
          />
        </View>
        <Link
          to="/register"
          exact
          style={styles.subBtn}
        ><Text>
          Kliknij tu by się zarejestrować
          </Text>
        </Link>

        <Button mode="outlined" style={{ marginTop: 20 }} onClick={login}>
         <Text> Zaloguj się</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    authView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
      },
    containerLogin: {
        flexDirection: 'column',
        width: 362,
        padding: 45,
        backgroundColor: '#d7e0ff',
        borderRadius: 30,
      },
      infoSub: {
        marginTop: 16,
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 34,
        letterSpacing: 0.2,
      },
      infoMain: {
        fontSize: 36,
        fontWeight: 'bold',
        lineHeight: 46,
        letterSpacing: 0.2,
      },
      subBtn: {
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 13,
        color: 'gray',
        textDecorationLine: 'underline',
      },
  });

  
export default Login;