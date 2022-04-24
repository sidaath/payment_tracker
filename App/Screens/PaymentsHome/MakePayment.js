import React from 'react'
import {ScrollView} from 'react-native'
import { Card, Text } from 'react-native-paper'


export default function MakePayment({navigation, route}){

    const [service, setService] = React.useState(route.params?.service? route.params.service : null )
    console.log(service)

    return (
        <ScrollView>
            <Card>
                <Card.Title title={`Details : ${service.serviceName}`} />
                {service.monthly && <Text>Pick Month</Text>}
                {!service.monthly && <Text>Pick date of payment</Text>}
                {service.fixedAmount && <Text>Amount : {`${service.amount}`}</Text>}
                {!service.fixedAmount && <Text>Enter Amount</Text>}
                <Text>Payment Method</Text>
            </Card>
        </ScrollView>
    )
}