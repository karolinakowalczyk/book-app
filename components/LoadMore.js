import { View } from "react-native";
import React from 'react';
import { Colors, IconButton } from 'react-native-paper';


const LoadMore = (props) => {
    const loadMore = props.loadMore;
    const comeBack = props.comeBack;
    const loadMoreDisabled= props.loadMoreDisabled;
    const comeBackDisabled = props.comeBackDisabled;
    return (
        <View style={{flexDirection: 'row'}}>
            <IconButton disabled={comeBackDisabled} icon="arrow-left" color={Colors.purple900} size={40} style={{ paddingLeft: 20 }} onPress={() => comeBack()}/>
            <IconButton disabled={loadMoreDisabled} icon="arrow-right" color={Colors.purple900} size={40} style={{ marginLeft: 'auto', paddingRight: 20 }} onPress={() => loadMore()}/>
        </View>
    );
  };

  export default LoadMore;