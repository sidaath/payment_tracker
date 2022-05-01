import React, {useState, useEffect} from 'react'
import {ScrollView} from 'react-native'
import { ActivityIndicator, Card } from 'react-native-paper'
import { getPayments } from '../../ViewModel/Payments'

export default function ServicePaymentHistory({route, navigation}){
    
    const [loading, setLoading] = useState(true)
    const [payments, setPayments] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const paymentsRes = await getPayments(route.params.service.serviceName)
            if(paymentsRes.result===true){
                setPayments(paymentsRes.payments)
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    
    if(loading){
        return (<ActivityIndicator />)
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