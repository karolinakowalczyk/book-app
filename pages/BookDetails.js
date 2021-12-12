import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView } from "react-native";
import React from 'react';
import BackButton from "../components/BackButton";
import { Colors, Card, IconButton, Button, RadioButton,
    Modal, Portal,  Provider } from "react-native-paper";
import BigStars from "../components/BigStars";
import CommentList from "../components/CommentList";
import OpenLibraryAPI from "../OpenLibraryAPI";
import { useParams } from "react-router";
import { auth, db } from "../firebase";
import { Rating, AirbnbRating } from "react-native-elements";
import { dbAddStatus } from "../firebase";



const BookDetails = () => {
    const [filledHeart, setFilledHeart] = React.useState(false);
    const {id, authorName} = useParams();
    const [book, setBook] = React.useState({});
    const [checked, setChecked] = React.useState('reading');
    const [error, setError] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    React.useEffect(() => {
        const checkDbFavourites = () => {
            db.collection("favourite-books")
            .where("book_id", "==", id)
            .where("user_id", "==", auth.currentUser.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                if (doc.data()) {
                    setFilledHeart(true);
                }
            })
        });
        }
        checkDbFavourites();
        
            
    
        OpenLibraryAPI.getBook(id).then(
            data => {
                console.log(data);
                if (data.description && data.description.type) {
                    setBook({...data, author_name: authorName, description: data.description.value})
                }
                else {
                    setBook({...data, author_name: authorName})
                }
            },
            (error) => setError(error)
        )
    }, []);
    const likeBook = async () => {
        setFilledHeart(!filledHeart);
    //TO DO: add/remove this book from 'liked books'
    if (!filledHeart) {
    db.collection("favourite-books").add({
        book_id: id,
        author_name: authorName,
        title: book.title,
        cover: book.cover,
        user_id: auth.currentUser.uid,
    }).catch((error) => {
        console.error("Error adding document: ", error);
      });;
    }
    else {
       db.collection("favourite-books")
       .where('book_id', "==", id)
       .where("user_id", "==", auth.currentUser.uid)
       .get()
       .then(querySnapshot => {
           querySnapshot.forEach(doc => {
               doc.ref.delete()
           })
       });
    }
    }
    const  markBook = () => {
        
        //TO DO: implement this method
    }

    const setBookStatus = () => {
        dbAddStatus(auth.currentUser.uid, id, checked);
        hideModal();
    }

    const markBookModal = () => {
        return (
            
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} >
              <Card style={{ width: '95%',  alignSelf: 'center'}}>
          <Card.Title title="Oznacz książkę jako:" />
          <Card.Content>
          <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', borderRadius: 7, borderColor: Colors.purple600, borderWidth: 1}}>
            <RadioButton
            value="willRead"
            status={ checked === 'willRead' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('willRead')}
            />
            <Text>Chcę przeczytać</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', borderRadius: 7, borderColor: Colors.purple600, borderWidth: 1}}>
            <RadioButton
                value="reading"
                status={ checked === 'reading' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('reading')}
            />
            <Text>W trakcie czytania</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', borderRadius: 7, borderColor: Colors.purple600, borderWidth: 1}}>
            <RadioButton
                value="read"
                status={ checked === 'read' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('read')}
            />
            <Text>Preczytana</Text>
            </View>
      
          </Card.Content>
          <Card.Actions>
            <Button onPress={hideModal}>Cancel</Button>
            <Button onPress={setBookStatus}>Ok</Button>
          </Card.Actions>
        </Card>
              </Modal>
            </Portal>
        
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView vertical={true}>                  
                    <Card style={{ flex: 1, backgroundColor: Colors.grey200}}>
                        <Card.Cover resizeMode="contain" source={{ uri: book.cover ? book.cover : 'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68' }} />
                        <Card.Content style={{ marginTop: 10, paddingBottom: 5 }}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{ color: Colors.purple900, fontSize: 32 }}>{book.title ? book.title : 'No title'}</Text>
                                {filledHeart ?
                                <IconButton icon="heart" color={Colors.pink200} size={40} style={{ margin: -4, padding: 0 }} onPress={() => likeBook()} />
                                : <IconButton icon="heart-outline" color={Colors.pink200} size={40} style={{ margin: -4, padding: 0 }} onPress={() => likeBook()} />}
                            </View>
                            <View style={styles.row}>
                            <Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 5 }}>by </Text>
                              <Text style={{ color: Colors.grey600, fontSize: 24, marginTop: 5 }}>{book.author_name ? book.author_name : "Autor nieznany"} </Text>
                            </View>
                            <Text style={{ color: Colors.grey600, fontSize: 12, marginTop: 5 }}>{ book.description ? book.description : "Oops! Autor nie przygotował opisu tej ksiąki!"}</Text>
                            <BigStars />
                            <Button icon="plus" mode="outlined"  style={{ marginTop: 10 }} onPress={() => showModal()}>
                                Oznacz książkę
                            </Button>
                            {markBookModal()}
                            <CommentList />
                            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 20, alignSelf: 'center'}}>
                                <Rating
                                showRating
                                imageSize={27}
                                type="custom"
                                tintColor={Colors.grey200}
                                ratingBackgroundColor='#c8c7c8'
                                style={{ paddingVertical: 10, size: 10, marginRight: 25}}
                                />
                                <Button mode="outlined"><Text style={{fontSize: 17}}>Oceń </Text></Button>

                            </View>
                        </Card.Content>
                    </Card> 
                    <BackButton link="/main/home"/>
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