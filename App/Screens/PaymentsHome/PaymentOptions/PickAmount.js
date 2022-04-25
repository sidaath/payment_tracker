import React from 'react'
import {View} from 'react-native'
import { TextInput } from 'react-native-paper'

export default function PickAmount({amount, setAmount, error}){
    return(
        <View style={{marginTop:40}}>
            <TextInput 
            mode='outlined'
            label='Amount'
            keyboardType='numeric'
            value={amount}
            onChangeText={(val)=>{setAmount(val)}}
            error={error}
        />
        </View>
    )
}