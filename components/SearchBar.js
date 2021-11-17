import * as React from 'react';
import { Searchbar, IconButton, Colors } from 'react-native-paper';
import {View} from 'react-native';


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={{flexDirection: 'row', marginTop: 25, marginBottom: 0, alignSelf: 'center'}}>
      <Searchbar
        style={{width: '80%', borderRadius: 5}}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <IconButton icon="filter-outline"
        size={30}  color={Colors.deepPurple600} style={{alignSelf: 'center'}}
        />
    </View>
  );
};

export default SearchBar;