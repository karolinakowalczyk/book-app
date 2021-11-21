import { View } from "react-native";
import React from 'react';
import { Colors, IconButton } from 'react-native-paper';


const LoadMore = () => {

    const loadMore = () => {
        
    }
    const comeBack = () => {
    
    }
    return (
        <View style={{flexDirection: 'row'}}>
            <IconButton icon="arrow-left" color={Colors.purple900} size={40} style={{ paddingLeft: 20 }} onPress={() => comeBack()}/>
            <IconButton icon="arrow-right" color={Colors.purple900} size={40} style={{ marginLeft: 'auto', paddingRight: 20 }} onPress={() => loadMore()}/>
        </View>
    );
  };

  export default LoadMore;