import React, {useState, useEffect} from 'react';
import {View, Text, Platform, TouchableOpacity, ToastAndroid, AlertIOS } from 'react-native';
import { Colors, Button, Card, TextInput, Modal, Portal,  Provider} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, dbAddTimePlanned, GetPlanningStats } from "../firebase.js";
import LoadMore from "../components/LoadMore";


const PlannerPage = () => {
  
  const [date, setDate] = useState( new Date(Date.now()))
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();
  const [statsResult, setStatsResult] = useState([]);
  const [comeBackDisabled, setComeBackDisabled] = React.useState(true);
  const [loadMoreDisabled, setLoadMoreDisabled] = React.useState(false);
  const [offset, setOffset] = React.useState(0);

  
  const [visible, setVisible] = React.useState(false);

   const getMonthName = (month) => {
        switch (month) {
            case '0':
                return 'Styczeń'
            case '1':
                return 'Luty'
            case '2':
                return 'Marzec'
            case '3':
                return 'Kwiecień'
            case '4':
                return 'Maj'
            case '5':
                return 'Czerwiec'
            case '6':
                return 'Lipiec'
            case '7':
                return 'Sierpień'
            case '8':
                return 'Wrzesień'
            case '9':
                return 'Październik'
            case '10':
                return 'Listopad'
            case '11':
                return 'Grudzień'
            default:
                return month + 1;
        }
}

  const dateYear = (dateString) =>{
    const date = new Date(dateString);
    return (date.getFullYear()).toString(); 
  }
  
  const dateMonth = (dateString) =>{
    const date = new Date(dateString);
    const month = (date.getMonth()).toString();
    return getMonthName(month);
  }

  const dateDay = (dateString) => {
    const date = new Date(dateString);
    return (date.getDate()).toString();
  }

   useEffect(() => {
    const getStats = async () => { 
    let results = await GetPlanningStats(auth.currentUser.uid);
    let doneHours = 0;
    
    let plansHours = 0;
    let endDate = '';
    
    let tempStatsArray = [];
    let index = 0;
      

    results.week.forEach(week => {
      index++;
      if (results.done[week] === undefined) {
        doneHours = 0
      }
      else {
        doneHours = results.done[week].hours 
        endDate = results.done[week].weekEnd
      }
      if (results.plans[week] === undefined) {
        plansHours = 0
      }
      else {
        plansHours = results.plans[week].hours
        endDate = results.plans[week].weekEnd
      }
      let weekDate = dateDay(week) + ' ' + dateMonth(week) + ' ' + dateYear(week);
      let weekEndDate = dateDay(endDate) + ' ' + dateMonth(endDate) + ' ' + dateYear(endDate);
      tempStatsArray.push(
            <Card key={index} style={{width: '85%', height: '45%', alignSelf: 'center', marginTop: 10}}>
              <Card.Content style={{ marginTop: 10, paddingBottom: 5 }}>
                <Text numberOfLines={1} style={{ color: Colors.purple900, fontSize: 18 }}>Tydzień:</Text>
                <Text numberOfLines={1} style={{ color: Colors.purple900, fontSize: 14 }}>{weekDate} - {weekEndDate}</Text>
                  <Text numberOfLines={1} style={{ color: Colors.purple900, fontSize: 18 }}>Przeczytano:</Text>
                  <Text numberOfLines={1} style={{ color: Colors.purple900, fontSize: 14 }}>{doneHours} h</Text>
                  <Text numberOfLines={1} style={{ color: Colors.purple900, fontSize: 18 }}>Planowano:</Text>
                  <Text numberOfLines={1} style={{ color: Colors.purple900, fontSize: 14 }}>Przeczytano: {plansHours} h</Text>
              </Card.Content>
              </Card>
            );

    })
      if (tempStatsArray.length > offset + 2) {
            setLoadMoreDisabled(false);
        } 
        else {
            setLoadMoreDisabled(true);
        }

      tempStatsArray = tempStatsArray.slice(offset, offset + 2);
      setStatsResult(tempStatsArray);
    }
    getStats();
   }, [offset])
  
  const loadMore = () => {
        setOffset(offset + 2)
        setComeBackDisabled(false);
    }
    const comeBack = () => {
        if (offset >= 2) {
            setOffset(offset - 2)
        }
        setComeBackDisabled(true);
    }

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
            <Text style={{ marginTop: 20 }}>{formatDate(date)}</Text>
            </TouchableOpacity>
            {show && (
            <DateTimePicker
            value={date}
            minimumDate={Date.parse(new Date())}
            display='default'
            mode={mode}
            onChange={onChange}
            />
            )}
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
  <Button mode="contained" style={{marginTop: 50, width: '70%', alignSelf: 'center'}} onPress={showModal}>
    Stwórz nowy plan!
  </Button>
    <View style={{ flexDirection: 'row', marginTop: 45, flex: 1, flexWrap: 'wrap', justifyContent: 'center' }} >
      {statsResult}
    </View>
  <LoadMore  comeBackDisabled={comeBackDisabled} loadMoreDisabled={loadMoreDisabled} comeBack={comeBack} loadMore={loadMore}/>
</Provider>          
  );
};
  const formatDate = (date) => {
return `${date.getDate()}/${date.getMonth() +
  1}/${date.getFullYear()}`;
};

  export default PlannerPage;