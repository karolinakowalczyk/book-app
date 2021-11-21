import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

const FilterView = (props) => {
  const [filterValues, setFilterValues] = React.useState(['','','','','','']);
  const visible = props.visible;
  const hideDialog = props.hideDialog;
  const filters = ['title', 'author', 'subject', 'place', 'person', 'publisher']
 
  const changeFilterValues = (text, idx) => {
    const newValues = [...filterValues];
    newValues[idx] = text;
    setFilterValues(newValues);
  }
  const createTextInputs = () => {
    let tempText = '';
    return filters.map((el, idx) =>
      <TextInput
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
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

export default FilterView;