import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from "react-native-paper";
import Comment from './Comment';
import InputComment from './InputComment';

const CommentList = (props) => {

    const [comments, setComments] = React.useState([]); // array for comments fetched from the API backend
    const [refreshing, setRefreshing] = React.useState(true); // whether comments list is being refreshed or not

  // Fetch comments when component is about to mount


  React.useEffect(() => {
        fetchComments(comments);
  });

  // Re-fetch comments when user pulls the list down
  //const onRefresh = () => fetchComments();

  // Call API to fetch comments
  const fetchComments = async (comments) => {
      setRefreshing(true);
      await setComments(comments);
      setRefreshing(false);
  };

  // Call API to submit a new comment
  const submitComment = () => {
    setRefreshing(true);
    comments.push("example comment after submit");
    fetchComments(comments); 
    setRefreshing(false);
  };
    return (
       <View style={styles.container}>
            
            <InputComment onSubmit={submitComment} />
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