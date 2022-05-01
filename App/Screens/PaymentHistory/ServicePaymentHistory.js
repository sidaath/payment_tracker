import React, {useState, useEffect} from 'react'
import {ScrollView} from 'react-native'
import { ActivityIndicator, Card, DataTable, Title } from 'react-native-paper'
import { getPayments } from '../../ViewModel/Payments'

export default function ServicePaymentHistory({route, navigation}){
    
    const [loading, setLoading] = useState(true)
    const [payments, setPayments] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)

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
    }, [])
    
    if(loading){
        return (<ActivityIndicator />)
    }

    if(errorMsg){
        return(
            <Title>{errorMsg}</Title>
        )
    }

    return(
        <ScrollView>
        <DataTable>
            <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Method</DataTable.Title> 
            <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {payments.map((payment)=>{
                console.log(payment)
                return(
                    <DataTable.Row key={payment.paymentID}>
                        <DataTable.Cell>{payment.dateOfPayment ? payment.dateOfPayment : payment.billingMonth}</DataTable.Cell>
                        <DataTable.Cell>{payment.paymentMethod}</DataTable.Cell>
                        <DataTable.Cell numeric>{payment.paymentAmount}</DataTable.Cell>
                    </DataTable.Row>
                )
            })}
        </DataTable>
        </ScrollView>
    )

}