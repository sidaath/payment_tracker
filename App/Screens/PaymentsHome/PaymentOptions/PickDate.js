import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React  from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Button } from 'react-native-paper'

export default function PickDate({date, setDate, error}){

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
        <View style={{marginTop : 20}}>
            <Button mode='contained' onPress={showPicker} color={error ? 'red' : null}>Pick Date</Button>
            <Text style={{alignSelf : 'center'}}>{`Selected Date : ${date.toLocaleDateString()}`}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    margin : {
        marginTop : 20
    }
})