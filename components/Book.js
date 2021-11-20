import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';
import {Link } from "react-router-native";

const Stars = (props) => {
    let numberOfStars = props.number;
    numberOfStars? numberOfStars : numberOfStars = 5;
    const amount = [];
    for (let i = 0; i < numberOfStars; i++) {
        amount.push(<IconButton key={i} icon="star" color={Colors.yellow500}
        size={15} style={{margin: -4, padding:0}}
        />)
    }
    return <View style={{flexDirection: 'row', marginTop: 10}}>{amount}</View>;
}

const Book = () => {
  return (
      <Card style={{width: '85%'}}>
      <Card.Cover style={{width: '100%', height: '50%'}} source={{ uri: 'https://picsum.photos/200/300' }} />
      <Card.Content style={{marginTop: 10, paddingBottom: 5}}>
        <Text style={{color: Colors.purple900, fontSize: 12}}>Example Book Title</Text>
        <Text style={{color: Colors.grey600, fontSize: 9, marginTop: 5}}>by John Flanagan</Text>
        <Stars />
      </Card.Content>
      </Card>
    )
}

export default Book;