import React from "react";
import {StyleSheet, View} from 'react-native'
import { Button,  Menu, Title } from 'react-native-paper'
import { months } from '../../../ViewModel/Months'

export default function PickMonth({month, setMonth, error}){
    const [show, setShow] = React.useState(false)
    const openMenu = () => setShow(true);

    const selectMonth = (month) =>{
        setShow(false)
        setMonth(month)
    }
    return(
        
        <View style={styles.menuView}>
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
        alignItems : 'center'
    }
})