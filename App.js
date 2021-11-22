import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import { Provider as PaperProvider } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login';
import Register from './pages/Register';
import WelcomePage from './pages/WelcomePage';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import UserBooksPage from './pages/UserBooksPage';
import BookDetails from './pages/BookDetails';

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
              <WelcomePage/>
            </Route>
            <Route path="/book-details/:id/:authorName" exact>
              <BookDetails/>
            </Route>
            <Route>
              <Route path="/home" exact>
                <HomePage/>
              </Route>
              <Route path="/profile" exact>
                <ProfilePage/>
              </Route>
              <Route path="/userBooks" exact>
                <UserBooksPage/>
              </Route>
            <BottomNav/>
            </Route>        
        </Switch>
      </NativeRouter>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  
});
