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

const Book = (props) => {
  const authorName = typeof props.book.author_name === Array ? props.book.author_name[0] : props.book.author_name;
  const title = props.book.title;
  const cover = props.book.cover;
  return (
      <Card style={{width: '85%'}}>
      <Card.Cover resizeMode="contain" style={{width: '100%', height: 100}} source={{ uri: cover ? cover : 'https://picsum.photos/200/300' }} />
      <Card.Content  style={{marginTop: 10, paddingBottom: 5}}>
        <Text numberOfLines={1} style={{color: Colors.purple900, fontSize: 12}}>{title}</Text>
        <Text numberOfLines={2} style={{color: Colors.grey600, fontSize: 9, marginTop: 5, height: 22}}>by {authorName}</Text>
        <Stars />
      </Card.Content>
      </Card>
    )
}

export default Book;