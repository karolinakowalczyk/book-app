import React, { PureComponent, PropTypes } from 'react';
import { Avatar } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';
import { Colors } from "react-native-paper";

const Comment = (props) => {

    // Pull comment object out of props
    //const { comment } = this.props;
    // Pull data needed to display a comment out of comment object
    //const { content, created, user } = comment;
    // Pull user name and avatar out of user object
    //const { name, avatar } = user;
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
           <Avatar.Icon size={32} icon="account-circle" />
        </View>
        <View style={styles.contentContainer}>
          <Text>
            <Text style={[styles.text, styles.name]}>Name</Text>
            {' '}
            <Text style={styles.text}>{props.comment}</Text>
          </Text>
          <Text style={[styles.text, styles.created]}>{moment().fromNow()}</Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      marginTop: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: Colors.black,
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: Colors.grey300,
  },
});

export default Comment;