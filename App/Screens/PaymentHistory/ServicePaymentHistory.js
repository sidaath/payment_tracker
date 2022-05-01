import React, {useState, useEffect} from 'react'
import {ScrollView} from 'react-native'
import { ActivityIndicator, Card, Title } from 'react-native-paper'
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
            {payments.map((payment)=>{
                return(
                    <Card key={payment.paymentID}>
                        <Card.Title title={payment.paymentID} />
                    </Card>
                )
            })}
        </ScrollView>
    )

}