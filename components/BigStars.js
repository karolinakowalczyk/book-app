import React from 'react';
import { View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

const BigStars = (props) => {
    let numberOfStars = props.number;
    numberOfStars? numberOfStars : numberOfStars = 5;
    const amount = [];
    for (let i = 0; i < numberOfStars; i++) {
        amount.push(<IconButton key={i} icon="star" color={Colors.yellow500}
        size={30} style={{margin: -4, padding:0}}
        />)
    }
    return <View style={{flexDirection: 'row', marginTop: 10}}>{amount}</View>;
}

export default BigStars;
