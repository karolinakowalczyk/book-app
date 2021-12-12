import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import { Avatar, Colors, Button, IconButton,
     Card, Title, Paragraph, TextInput, Modal, Portal,  Provider} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';


const PlannerPage = () => {
    const [date, setDate] = useState(new Date(Date.now()));
    const [value, setValue] = useState();
    const [visible, setVisible] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const loadStats = () => {

    }
  
    const onChange = (event, selectedDate) => {
      //const currentDate = selectedDate || date;
      //setShow(Platform.OS === 'ios');
      //setDate(currentDate);
    };
  
  return (
    <DateTimePicker
        style={{width: 200}}
        testID="dateTimePicker"
        value={date}
        mode="date"
        //is24Hour={true}
        display="default"
        onChange={onChange}
        />
    
      
            
           

           
    );
  };

  export default PlannerPage;