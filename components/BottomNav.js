import  React from 'react';
import { Redirect } from 'react-router-native';
import { BottomNavigation } from 'react-native-paper';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import UserBooksPage from '../pages/UserBooksPage';
import PlannerPage from '../pages/PlannerPage';
import WelcomePage from '../pages/WelcomePage';


const LogoutRoute = () => <Redirect to="/" exact />

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'profile', title: 'Profile', icon: 'account' },
    { key: 'books', title: 'Books', icon: 'book-open-variant' },
    { key: 'planner', title: 'Planner', icon: 'calendar' },
    {key: 'logout', title: 'Logout', icon: 'logout'}
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomePage,
    profile: ProfilePage,
    books: UserBooksPage,
    planner: PlannerPage,
    logout: LogoutRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      
    />
  );
};

export default MyComponent;