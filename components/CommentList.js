import React, { Component, useEffect } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Comment from './Comment';
import InputComment from './InputComment';

const CommentList = (props) => {

    const [comments, setComments] = React.useState([]); // array for comments fetched from the API backend
    const [refreshing, setRefreshing] = React.useState(true); // whether comments list is being refreshed or not
    const scrollView = React.useRef(null);

  // Fetch comments when component is about to mount
  //componentWillMount = () => fetchComments();
  React.useEffect(() => {
        fetchComments();
  });

  // Re-fetch comments when user pulls the list down
  const onRefresh = () => fetchComments();

  // Call API to fetch comments
  const fetchComments = async () => {
      setRefreshing(true);
      comments.push("comment 1");
      comments.push("comment 2");
      // comments.push("comment 3");
      console.log("cos");
      setRefreshing(false);
    /*try {
      // Make API call
      const response = await get('comments');
      // Convert response to JSON
      const json = await response.json();
      this.setState({
        refreshing: false,
        comments: json.comments
      });
    }
    catch (error) {
      alert(error);
    }*/
  };

  // Call API to submit a new comment
  const submitComment = async (comment) => {
    //const { user } = this.props;
    //scrollView.scrollTo({ y: 0 });
      setRefreshing(true);
      comments.push("comment 3");
      console.log("added");
      setRefreshing(false);
    /*try {
      // Make API call
      const response = await put('comments', {
        user_id: user._id,
        content: comment,
      });
      // Convert response to JSON
      const json = await response.json();
      this.setState({
        // Push new comment to state before existing ones
        comments: [json.comment, ...this.state.comments]
      });
    }
    catch (error) {
      alert(error);
    }*/
  };

  
    return (
       
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}>
            <InputComment onSubmit={submitComment} />
            <Text>hey</Text>
      
            {/* Render each comment with Comment component */}
          {comments.map((comment, index) => <Comment comment={comment} key={index} />)}
           </ScrollView>
        
 
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
    //paddingBottom: 20
   //height: '100%'
  }
});

export default CommentList;