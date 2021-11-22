import * as React from 'react';
import { Searchbar, IconButton, Colors } from 'react-native-paper';
import {View} from 'react-native';
import FilterView from '../pages/FilterPage';


const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visibleFilterDialog, setVisibleFilterDialog] = React.useState(false);

  const onChangeSearch = query => setSearchQuery(query);

  const showDialog = () => setVisibleFilterDialog(true);

  const hideDialog = () => setVisibleFilterDialog(false);

  return (
    <View style={{flexDirection: 'row', marginTop: 25, marginBottom: 0, alignSelf: 'center'}}>
      <Searchbar
        style={{width: '80%', borderRadius: 5}}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <IconButton icon="filter-outline"
        size={30}  color={Colors.deepPurple600} style={{alignSelf: 'center'}} onPress={showDialog}
        />
        <FilterView hideDialog={hideDialog} setFilters={props.setFilters} visible={visibleFilterDialog} />
    </View>
  );
};

export default SearchBar;