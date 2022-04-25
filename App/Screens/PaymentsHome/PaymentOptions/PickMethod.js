import React from 'react'
import { Menu, Title, Button, TextInput } from 'react-native-paper'
import {StyleSheet } from 'react-native'
import { paymentMethods } from '../../../ViewModel/PaymentMethods';


export default function PickMethod({paymentMethod, setPaymentMethod}){
    const [show, setShow] = React.useState(false)
    const openMenu = () => setShow(true);

    const selectMethod = (method) =>{
        setShow(false)
        setPaymentMethod(method)
    }

    return (
        <>
            <Title>Payment Method</Title>
            <Menu
                style={styles.menu} 
                visible={show} 
                onDismiss={()=>{setShow(false)}} 
                anchor={<Button mode='outlined' onPress={openMenu}>{paymentMethod ? paymentMethod : 'Select Method'}</Button>}
            >
                {paymentMethods.map((method)=>{
                    return(
                        <Menu.Item title={method} onPress={() => {selectMethod(method)}} key={method} />
                    )
                })}
            </Menu>
        </>
    )
}
const styles = StyleSheet.create({
    menu : {
        left : 110,
        right : 110
    },
})