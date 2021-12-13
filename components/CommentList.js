import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import firebase from 'firebase';
import { Colors, Text } from "react-native-paper";
import Comment from './Comment';
import InputComment from './InputComment';
import { auth } from '../firebase';
import { dbGetComments, dbAddComment} from '../firebase';

const CommentList = (props) => {
  const {bookId} = props; 

    const [comments, setComments] = React.useState([]); // array for comments fetched from the API backend
    const [refreshing, setRefreshing] = React.useState(true); // whether comments list is being refreshed or not

  // Fetch comments when component is about to mount


  useEffect(() => {
    const getBookComments = async () => {
      const commentsDb = await dbGetComments(bookId);
      if (commentsDb.length > 0) {
        setComments(commentsDb);
          // comments.forEach(comment => {
          //     commentsJSX.push(
          //         <View>
                      
          //         </View>
          //     )
          // })
      }

    }
  getBookComments();
  }, []);


  const addComment = (text) => {
    dbAddComment(auth.currentUser.uid, bookId, text);
    const commentsCopy = [...comments]
    commentsCopy.push({dateTime: firebase.firestore.Timestamp.fromDate(new Date()), comment: text, book_id: bookId})
    setComments(commentsCopy);
  }
    return (
       <View style={styles.container}>
            
            <InputComment addComment={addComment} />
            {/* Render each comment with Comment component */}
          {comments.map((comment, index) => <Comment comment={comment} key={index} />)}
            
        </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
    marginTop: 20,
    borderRadius: 10,
    paddingBottom: 20
  }
});

export default CommentList;