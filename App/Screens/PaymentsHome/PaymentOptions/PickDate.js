import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React  from 'react'
import {View, Text} from 'react-native'
import { Button } from 'react-native-paper'

export default function PickDate({date, setDate}){

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };

    const showPicker = ()=>{
        DateTimePickerAndroid.open({
            value : date,
            onChange,
            mode : 'date'
        })
    }

    return(
        <View>
            <Button onPress={showPicker}>Pick Date</Button>
            <Text style={{alignSelf : 'center'}}>{`Selected Date : ${date.toLocaleDateString()}`}</Text>
        </View>
    )
}