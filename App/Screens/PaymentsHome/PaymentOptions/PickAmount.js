import React from 'react'
import { TextInput } from 'react-native-paper'

export default function PickAmount({amount, setAmount, error}){
    
    return(
        <TextInput 
            mode='outlined'
            label='Amount'
            keyboardType='numeric'
            value={amount}
            onChangeValue={(val)=>{setAmount(val)}}
            error={error}
        />
    )
}