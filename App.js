import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import { Provider as PaperProvider } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <PaperProvider>
      <NativeRouter>
        <Switch>
          <Route path="/register" exact>
            <Register/>
          </Route>
          <Route path="/login" exact>
            <Login/>
          </Route>   
          <Route path="/" exact>
            <MainPage/>
            {/*<View style={styles.container}>
            <View>
            <Link to="/login"><Text>Go to login page</Text></Link>
            <StatusBar style="auto" />
            </View>
  </View>*/}
          </Route>
        </Switch>
      </NativeRouter>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  
});
