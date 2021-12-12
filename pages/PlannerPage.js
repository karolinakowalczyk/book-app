import React, {useState} from 'react';
import {View, Text, Platform, TouchableOpacity, ToastAndroid, AlertIOS } from 'react-native';
import { Avatar, Colors, Button, IconButton,
     Card, Title, Paragraph, TextInput, Modal, Portal,  Provider} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db, dbAddTimePlanned } from "../firebase.js";
//import Toast from 'react-native-root-toast'


const PlannerPage = () => {
  
  const [date, setDate] = useState( new Date(Date.now()))
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();
  
  const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

const onChange = (event, selectedValue) => {
  setShow(Platform.OS === 'ios');
  if (mode == 'date') {
    const currentDate = selectedValue || new Date();
    setDate(currentDate);
  } else {
    const selectedTime = selectedValue || new Date();
    setTime(selectedTime);
    setShow(Platform.OS === 'ios');
    setMode('date');
  }
};
const showMode = currentMode => {
  setShow(true);
  setMode(currentMode);
};

const showDatePicker = () => {
  showMode('date');
  };
  
  
  const createPlan = () => {
    dbAddTimePlanned(auth.currentUser.uid, parseInt(value), date);
    let msg = "Plan został dodany!"
    hideModal();
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
};

return (
<Provider>
  <Portal>
    <Modal visible={visible} onDismiss={hideModal} >
      <Card style={{ width: '95%',  alignSelf: 'center'}}>
        <Card.Title title="Planuj!" subtitle="Ustaw następną statystykę"  />
        <Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={showDatePicker}>
            {show && (
            <DateTimePicker
            style={{width: 200}}
            value={date}
            minimumDate={Date.parse(new Date())}
            display='default'
            mode={mode}
            onChange={onChange}
            />
            )}
            </TouchableOpacity>
          </View> 
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <Text style={{marginRight: 10}}>Ile godzin poświęcisz na czytanie dziennie: </Text>
            <TextInput
            style={{width: 35, height: 35}}
            value={value}
            onChangeText={text => setValue(text)}
            />
          </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={hideModal}>Cancel</Button>
            <Button onPress={createPlan}>Ok</Button>
          </Card.Actions>
      </Card>
    </Modal>
  </Portal>
  <Button mode="contained" style={{marginTop: 30, width: '70%', alignSelf: 'center'}} onPress={showModal}>
    Stwórz nowy plan!
    </Button>

</Provider>          
  );
};
  const formatDate = (date) => {
return `${date.getDate()}/${date.getMonth() +
  1}/${date.getFullYear()}`;
};

  export default PlannerPage;