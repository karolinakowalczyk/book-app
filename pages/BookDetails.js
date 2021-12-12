import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView } from "react-native";
import React from 'react';
import BackButton from "../components/BackButton";
import { Colors, Card, IconButton, Button, RadioButton,
    Modal, Portal,  Provider, TextInput} from "react-native-paper";
import BigStars from "../components/BigStars";
import CommentList from "../components/CommentList";
import OpenLibraryAPI from "../OpenLibraryAPI";
import { useParams } from "react-router";
import { auth, db, dbAddRating, dbAddTime, dbAddTimePlanned, dbGetComments } from "../firebase";
import { Rating, AirbnbRating } from "react-native-elements";
import { dbAddStatus, dbGetStatus, dbGetRating, dbAddComment } from "../firebase";
import DateTimePicker from '@react-native-community/datetimepicker';



const BookDetails = () => {
    const [filledHeart, setFilledHeart] = React.useState(false);
    const {id, authorName} = useParams();
    const [book, setBook] = React.useState({});
    const [checked, setChecked] = React.useState('Brak');
    const [tempChecked, setTempChecked] = React.useState();
    const [error, setError] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const [logTimeModalVisible, setLogTimeModalVisible] = React.useState(false);
    const [date, setDate] = React.useState(new Date(Date.now()));
    const [logTimeValue, setLogTimeValue] = React.useState();
    const [rating, setRating] = React.useState(3);
    const [tempRating, setTempRating] = React.useState(3);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const showLogTimeModal = () => setLogTimeModalVisible(true);
    const hideLogTimeModal = () => setLogTimeModalVisible(false);

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



        const getBookStatus = async () => {
            const status = await dbGetStatus(auth.currentUser.uid, id);
            if (status.length > 0) {
                setChecked(status[0].status);
                setTempChecked(status[0].status);
            }
        }

        const getBookRating = async () => {
            const ratings = await dbGetRating(auth.currentUser.uid, id);
            let avgRating = 5;
            if (ratings.length > 0) {
                avgRating = 0;
                ratings.forEach(el => {
                    avgRating += el.rating;
                })
                avgRating = avgRating/ratings.length;
            }
            setRating(Math.round(avgRating))

        }

        getBookRating();
        getBookStatus();
        checkDbFavourites();
        
            
    
        OpenLibraryAPI.getBook(id).then(
            data => {
                
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

    const setBookStatus = () => {
        dbAddStatus(auth.currentUser.uid, id, tempChecked, book.title, authorName, book.cover);
        setChecked(tempChecked);
        hideModal();
    }

    const addRating = () => {
        dbAddRating(auth.currentUser.uid, id, tempRating);
        setRating(tempRating);
    }

    const logTime = () => {
        dbAddTime(auth.currentUser.uid, id,Number.parseInt(logTimeValue), date);
        hideLogTimeModal();
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
    const logTimeModal = () => {
        return (
            <Portal>
              <Modal visible={logTimeModalVisible} onDismiss={hideLogTimeModal} >
              <Card style={{ width: '95%',  alignSelf: 'center'}}>
          <Card.Title title="Zaloguj czas" />
          <Card.Content>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ marginRight: 10}}>Za jaki dzień zalogować czas:</Text>
            <DateTimePicker
                style={{width: 200}}
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ marginRight: 10}}>Ile godzin zalogować:</Text>
                <TextInput
                    style={{width: 35, height: 35}}
                    value={logTimeValue}
                    onChangeText={text => setLogTimeValue(text)}
                />
            </View>
          </Card.Content>
            <Card.Actions>
                <Button onPress={hideLogTimeModal}>Cancel</Button>
                <Button onPress={logTime}>Ok</Button>
            </Card.Actions>
            </Card>
            </Modal>
            </Portal>
        
        )
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
            value="Plan to read"
            status={ tempChecked === 'Plan to read' ? 'checked' : 'unchecked' }
            onPress={() => setTempChecked('Plan to read')}
            />

            <Text>Chcę przeczytać</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', borderRadius: 7, borderColor: Colors.purple600, borderWidth: 1}}>
            <RadioButton
                value="Reading"
                status={ tempChecked === 'Reading' ? 'checked' : 'unchecked' }
                onPress={() => setTempChecked('Reading')}
            />
            <Text>W trakcie czytania</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', borderRadius: 7, borderColor: Colors.purple600, borderWidth: 1}}>
            <RadioButton
                value="Finished"
                status={ tempChecked === 'Finished' ? 'checked' : 'unchecked' }
                onPress={() => setTempChecked('Finished')}
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
                            <BigStars number={rating} />
                            <View style={{marginTop: 15, flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto'}}><Text style={{marginRight: 5, fontSize: 17}}>{`Aktualny status książki:`}</Text><Text style={{color: 'green', fontSize: 17}}>{`${checked === 'Plan to read' ? 'Chcę przeczytać' : (checked === 'Reading' ? 'W trakcie czytania' : (checked === 'Finished' ? 'Przeczytana' : 'Brak'))}`}</Text></View>
                            <Button icon="plus" mode="outlined"  style={{ marginTop: 10 }} onPress={() => showModal()}>
                                Zmień status książki
                            </Button>
                            <Button icon="plus" mode="outlined"  style={{ marginTop: 10 }} onPress={() => showLogTimeModal()}>
                                Zaloguj czas
                            </Button>
                            {markBookModal()}
                            {logTimeModal()}
                            <CommentList bookId={id}/>
                            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 20, alignSelf: 'center'}}>
                                <Rating
                                showRating
                                imageSize={27}
                                type="custom"
                                tintColor={Colors.grey200}
                                onFinishRating={(rating) => setTempRating(rating)}
                                ratingBackgroundColor='#c8c7c8'
                                style={{ paddingVertical: 10, size: 10, marginRight: 25}}
                                />
                                <Button mode="outlined" onPress={addRating}><Text style={{fontSize: 17}}>Oceń </Text></Button>

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