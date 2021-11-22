import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView } from "react-native";
import React from 'react';
import BackButton from "../components/BackButton";
import { Colors, Card, IconButton, Button } from "react-native-paper";
import BigStars from "../components/BigStars";
import CommentList from "../components/CommentList";
import OpenLibraryAPI from "../OpenLibraryAPI";
import { useParams } from "react-router";


const BookDetails = () => {
    const [filledHeart, setFilledHeart] = React.useState(false);
    const {id, authorName} = useParams();
    const [book, setBook] = React.useState({});
    const [bookAuthor, setBookAuthor] = React.useState({});
    const [bookId, setBookId] = React.useState('OL45883W');
    const [error, setError] = React.useState('');
    React.useEffect(() => {
        //w propsach przekazane book id
        OpenLibraryAPI.getBook(id).then(
            data => setBook({...data, author_name: authorName}),
            (error) => setError(error)
        )
    }, []);
    const likeBook = () => {
        setFilledHeart(!filledHeart);
    //TO DO: add/remove this book from 'liked books'
    }
    const  addToLibrary = () => {
        //TO DO: implement this method
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <BackButton />
                <ScrollView vertical={true}>                  
                    <Card style={{ flex: 1, backgroundColor: Colors.grey200}}>
                        <Card.Cover source={{ uri: 'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68' }} />
                        <Card.Content style={{ marginTop: 10, paddingBottom: 5 }}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{ color: Colors.purple900, fontSize: 32 }}>{book.title}</Text>
                                {filledHeart ?
                                <IconButton icon="heart" color={Colors.pink200} size={40} style={{ margin: -4, padding: 0 }} onPress={() => likeBook()} />
                                : <IconButton icon="heart-outline" color={Colors.pink200} size={40} style={{ margin: -4, padding: 0 }} onPress={() => likeBook()} />}
                            </View>
                            {/*<View style={styles.row}>
                            <Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 5 }}>by </Text>
<
                            {/* <Text>
                            {book.author_name}
                            </Text> */}
                            <View>
                              <Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 5 }}>{book.author_name ? book.author_name : "Autor nieznany"} </Text>
                            </View>
                            <Text style={{ color: Colors.grey600, fontSize: 12, marginTop: 5 }}>{ book.description ? book.description : "Oops! Autor nie przygotował opisu tej ksiąki!"}</Text>
                            {/*<Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 5 }}>by {book.author_name[0]} {book.author_name[0]}</Text>*/}
                            <BigStars />
                            <Button icon="plus" mode="outlined"  style={{ marginTop: 10 }} onPress={() => addToLibrary()}>
                                Dodaj do biblioteki
                                </Button>
                                <CommentList />
                        </Card.Content>
                    </Card> 
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
  
const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
       
    },
});

  export default BookDetails;