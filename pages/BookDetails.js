import { View, Text} from "react-native";
import React from 'react';
import BackButton from "../components/BackButton";
import { Colors, Card, IconButton, Button } from "react-native-paper";
import BigStars from "../components/BigStars";
import Comment from "../components/Comment";
import InputComment from "../components/InputComment"


const BookDetails = () => {
    const [filledHeart, setFilledHeart] = React.useState(false);
    const likeBook = () => {
    setFilledHeart(!filledHeart);
    //TO DO: add/remove this book from 'liked books'
    }
    const addToLibrary = () => {
        //TO DO: implement this method
    }
    return (
        <View style={{width: '100%', height: '100%', backgroundColor: Colors.grey200}}>
            <BackButton />
            <Card style={{ width: '100%', height: '100%'}}>
                <Card.Cover style={{width: '100%', height: '50%'}} source={{ uri: 'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68' }} />
                <Card.Content style={{ marginTop: 10, paddingBottom: 5 }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{ color: Colors.purple900, fontSize: 32 }}>Example Book Title</Text>
                        {filledHeart ?
                        <IconButton icon="heart" color={Colors.pink200} size={40} style={{ margin: -4, padding: 0 }} onPress={() => likeBook()} />
                        : <IconButton icon="heart-outline" color={Colors.pink200} size={40} style={{ margin: -4, padding: 0 }} onPress={() => likeBook()} />}
                    </View>
                   
                    <Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 5 }}>by John Flanagan</Text>
                    <BigStars />
                    <Button icon="plus" mode="outlined"  style={{ marginTop: 10 }} onPress={() => addToLibrary()}>
                            Dodaj do biblioteki
                    </Button>
                    <Comment />
                    <InputComment/>
                </Card.Content>
                
            </Card>
        </View>
    );
  };

  export default BookDetails;