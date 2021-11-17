import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View, TouchableOpacity
} from 'react-native';
import { Colors } from "react-native-paper";

const InputComment = (props) => {

  const [text, setText] = React.useState("");

  // Update state when input changes
  const onChangeText = (text) => {setText(text)};

  // Handle return press on the keyboard
  // NOTE: You don't really need it for this example, because
  // we're using a keyboard without return button, but I left it here
  // in case you'd want to switch to a different keyboard
  //const onSubmitEditing = ({ nativeEvent: { text } }) => this.setState({ text }, submit);

  // Call this.props.onSubmit handler and pass the comment
  const submit = () => {
    if (text) {
      props.addComment(text);
      setText('');
    } else {
      alert('Dodaj komentarz przed wysłaniem!');
    }
  };
    return (
      // This moves children view with input field and submit button
      // up above the keyboard when it's active
      <KeyboardAvoidingView
        behavior='position'
      >
        <View style={styles.container}>
          {/* Comment input field */}
          <TextInput
            placeholder="Co myślisz o tej książce?"
            keyboardType="twitter" // keyboard with no return button
            autoFocus={false} // focus and show the keyboard
            style={styles.input}
            value={text}
            onChangeText={onChangeText} // handle input changes
            //onSubmitEditing={onSubmitEditing} // handle submit event
          />
          {/* Post button */}
          <TouchableOpacity
            style={styles.button}
            onPress={submit}
          >
            {/* Apply inactive style if no input */}
            <Text style={[styles.text, !text ? styles.inactive : []]}>Dodaj</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: Colors.grey300,
  },
  text: {
    color: Colors.purple800,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default InputComment;