import React, {useState, useEffect} from 'react'
import {ScrollView, ToastAndroid} from 'react-native'
import { ActivityIndicator, Button, Card, DataTable, Dialog, IconButton, Modal, Paragraph, Portal, Provider, Subheading, Title } from 'react-native-paper'
import { paymentMethods } from '../../ViewModel/PaymentMethods'
import { deletePayment, getPayments } from '../../ViewModel/Payments'

export default function ServicePaymentHistory({route, navigation}){
    
    const [loading, setLoading] = useState(true)
    const [payments, setPayments] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const [reload, setReload] = useState(false)

    const [showDialog, setShowDialog] = useState(false)
    const [delName, setName] = useState(null)
    const [delID, setID] = useState(null)

    useEffect(()=>{
        navigation.setOptions({
            title : route.params.service.serviceName
        })
    },[navigation])

    useEffect(()=>{
        async function fetchData(){
            const paymentsRes = await getPayments(route.params.service.serviceName)
            if(paymentsRes.result===true){
                setPayments(paymentsRes.payments)
                setLoading(false)
            }
            if(paymentsRes.result === false && paymentsRes.error){
                setErrorMsg(paymentsRes.error)
                setLoading(false)
            }
        }
        fetchData()
    }, [reload])

    const stagePayment = (serviceName, paymentID) =>{
        setName(serviceName)
        setID(paymentID)
        setShowDialog(true)
    }

    const removePayment = async () =>{
        const respone = await deletePayment(delName, delID)
        if(respone.result === true){
            setName(null)
            setID(null)
            setShowDialog(false)
            setReload(!reload)
        }else{
            ToastAndroid.show("Failed to delete", ToastAndroid.SHORT)
            setShowDialog(false)
        }
    }

    function returnMethod(method){
        switch (method) {
            case paymentMethods[0]:
                return 'cash'    
                break;
            case paymentMethods[1]:
                return 'credit-card-outline'
                break;
            case paymentMethods[2]:
                return 'bank-transfer'
                break;
            case paymentMethods[3]:
                return 'dots-horizontal'
            default:
                return 'dots-horizontal'
                break;
        }
    }

    
    if(loading){
        return (<ActivityIndicator />)
    }

    if(errorMsg){
        return(
            <Title>{errorMsg}</Title>
        )
    }

    return(
        <Provider>
        <ScrollView>
        <DataTable>
            <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
            <DataTable.Title numeric></DataTable.Title>
            </DataTable.Header>

            {payments.map((payment)=>{
                console.log(payment)
                return(
                    <DataTable.Row key={payment.paymentID}>
                        <DataTable.Cell>{payment.dateOfPayment ? payment.dateOfPayment : payment.billingMonth}</DataTable.Cell>
                        <DataTable.Cell numeric>{payment.paymentAmount}</DataTable.Cell>
                        <DataTable.Cell numeric>
                            <IconButton icon={returnMethod(payment.paymentMethod)} />
                            <IconButton icon='delete-alert-outline' onPress={()=>{stagePayment(payment.serviceName, payment.paymentID)}}/>
                        </DataTable.Cell>
                    </DataTable.Row>
                )
            })}
        </DataTable>
        <Portal>

            <Dialog visible={showDialog} onDismiss={()=>setShowDialog(false)}>
                <Dialog.Title>Confirm Action</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Remove payment?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>{removePayment()}}>Confirm</Button>
                    <Button onPress={()=>{setShowDialog(false)}}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>

        </Portal>
        </ScrollView>
        </Provider>
    )

}