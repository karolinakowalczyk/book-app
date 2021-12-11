import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import { Avatar, Colors, Button, IconButton,
     Card, Title, Paragraph, TextInput, Modal, Portal,  Provider} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';


const PlannerPage = () => {
    const [date, setDate] = useState(new Date(Date.now()));
    const [value, setValue] = useState();
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const loadStats = () => {

    }
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    return (
    
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} >
        <Card style={{ width: '95%',  alignSelf: 'center'}}>
    <Card.Title title="Planuj!" subtitle="Ustaw następną statystykę"  />
    <Card.Content>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginRight: 10}}>Wybierz datę początkową: </Text>
        <DateTimePicker
        style={{width: 200}}
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
        />
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
      <Button>Cancel</Button>
      <Button>Ok</Button>
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

  export default PlannerPage;