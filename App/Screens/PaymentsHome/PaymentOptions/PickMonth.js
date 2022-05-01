import React from "react";
import {StyleSheet, View} from 'react-native'
import { Button,  Menu, TextInput, Title } from 'react-native-paper'
import { months } from '../../../ViewModel/Months'

export default function PickMonth({month, setMonth, error}){
    const [show, setShow] = React.useState(false)
    const date = new Date()
    const [year, setYear] = React.useState(date.getFullYear().toLocaleString())
    const openMenu = () => setShow(true);


    const selectMonth = (month) =>{
        setShow(false)
        const monthYear = `${month}/${year}`
        setMonth(monthYear)
    }


    return(
        
        <View  style={styles.menuView}>
            <Title>Month</Title>
            <Menu
                style={styles.menu} 
                visible={show} 
                onDismiss={()=>{setShow(false)}} 
                anchor={<Button mode='contained' onPress={openMenu} color={error? 'red' : null}>{month ? month : 'Pick Month'}</Button>}>
                {months.map((month)=>{
                return(
                    <Menu.Item title={month} onPress={() => {selectMonth(month)}} key={month} />
                )
            })}
        </Menu>
        <TextInput 
            style={styles.textInput} 
            mode="outlined"
            label='Year'
            value={year}
            onChangeText={(txt)=>{setYear(txt)}}
            keyboardType='numeric'
            />
        </View>   
    )
}

const styles = StyleSheet.create({
    menu : {
        top : 10,
        left : 110,
        right : 110
    },

    menuView : {
        flexDirection : 'row',
        justifyContent : 'space-evenly'
    },

    textInput : {
        height : 32,
        width:70
    }
})