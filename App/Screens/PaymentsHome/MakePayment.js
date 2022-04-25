import React from 'react'
import {ScrollView} from 'react-native'
import {Provider, Surface, Text, Title } from 'react-native-paper'
import PickDate from './PaymentOptions/PickDate'
import PickMonth from './PaymentOptions/PickMonth'

export default function MakePayment({navigation, route}){

    const [service, setService] = React.useState(route.params?.service? route.params.service : null )
    const [month, setMonth] = React.useState(null)
    const [date, setDate] = React.useState(null)

    return (
        <Provider>
        <ScrollView>
        <Surface >
            <Title>{service.serviceName}</Title>
                {service.monthly && <PickMonth month={month} setMonth={setMonth}/>}
                {!service.monthly && <PickDate date={date? date : new Date()} setDate={setDate}/>}
                {service.fixedAmount && <Text>Amount : {`${service.amount}`}</Text>}
                {!service.fixedAmount && <Text>Enter Amount</Text>}
                <Text>Payment Method</Text>
        </Surface>
        </ScrollView>
        </Provider>
    )
}


