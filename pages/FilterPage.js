import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import FilteredBooksPage from './FilteredBooksPage';

const FilterView = (props) => {
  const [filterValues, setFilterValues] = React.useState(['','','','','','']);
  const visible = props.visible;
  const setFilters = props.setFilters;
  const hideDialog = props.hideDialog;
  const filters = ['title', 'author', 'subject', 'place', 'person', 'publisher']
 
  const changeFilterValues = (text, idx) => {
    const newValues = [...filterValues];
    newValues[idx] = text;
    setFilterValues(newValues);
  }
  
  const filter = () => {
    const trueFilterValues = filterValues.filter(el => el !== '')
    if (trueFilterValues) {
    hideDialog();
    setFilters(filterValues);
    }
    else {
      hideDialog();
    }
  }

  const createTextInputs = () => {
    return filters.map((el, idx) =>
      <TextInput
        key={idx}
        style={{marginTop: 5}}
        dense
        label={`By ${el}`}
        onChangeText={(text) => changeFilterValues(text, idx)}
      />
    )
  }
  
  return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Filter books</Dialog.Title>
            <Dialog.Content>
              {/* <Text> */}
            {createTextInputs()}
            {/* </Text> */}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={filter}>Filter!</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

export default FilterView;