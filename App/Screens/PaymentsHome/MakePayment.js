import React from 'react'
import {ScrollView} from 'react-native'
import {Provider, Surface, Text, Title } from 'react-native-paper'
import PickMonth from './PaymentOptions/PickMonth'

export default function MakePayment({navigation, route}){

    const [service, setService] = React.useState(route.params?.service? route.params.service : null )
    const [month, setMonth] = React.useState('Pick Month')

    return (
        <Provider>
        <ScrollView>
        <Surface >
            <Title>{service.serviceName}</Title>
                {service.monthly && <PickMonth month={month} setMonth={setMonth}/>}
                {!service.monthly && <Text>Pick date of payment</Text>}
                {service.fixedAmount && <Text>Amount : {`${service.amount}`}</Text>}
                {!service.fixedAmount && <Text>Enter Amount</Text>}
                <Text>Payment Method</Text>
        </Surface>
        </ScrollView>
        </Provider>
    )
}


