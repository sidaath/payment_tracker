import React from 'react'
import { Menu, Title, Button, TextInput } from 'react-native-paper'
import {StyleSheet } from 'react-native'
import { paymentMethods } from '../../../ViewModel/PaymentMethods';


export default function PickMethod({paymentMethod, setPaymentMethod, error}){
    const [show, setShow] = React.useState(false)
    const openMenu = () => setShow(true);

    const selectMethod = (method) =>{
        setShow(false)
        setPaymentMethod(method)
    }

    return (
        <>
            <Title style={{marginTop:40}}>Payment Method</Title>
            <Menu
                style={styles.menu} 
                visible={show} 
                onDismiss={()=>{setShow(false)}} 
                anchor={<Button mode='contained' onPress={openMenu} color={error ? 'red' : null}>{paymentMethod ? paymentMethod : 'Select Method'}</Button>}
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