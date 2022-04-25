import React from 'react'
import {ScrollView} from 'react-native'
import {Paragraph, Provider, Surface, Text, Title } from 'react-native-paper'
import PickAmount from './PaymentOptions/PickAmount'
import PickDate from './PaymentOptions/PickDate'
import PickMonth from './PaymentOptions/PickMonth'

export default function MakePayment({navigation, route}){

    const [service, setService] = React.useState(route.params?.service? route.params.service : null )
    const [month, setMonth] = React.useState(null)
    const [date, setDate] = React.useState(null)
    const [amount, setAmount] = React.useState(null)
    let valueError = false

    return (
        <Provider>
        <ScrollView>
        <Surface style={{padding:20}}>
            <Title>{service.serviceName}</Title>
                {service.monthly && <PickMonth month={month} setMonth={setMonth}/>}
                {!service.monthly && <PickDate date={date? date : new Date()} setDate={setDate}/>}
                {service.fixedAmount && <Title>Amount : {`${service.amount}`}</Title>}
                {!service.fixedAmount && <PickAmount amount={amount} setAmount={setAmount} error={valueError}/>}
                <Text>Payment Method</Text>
        </Surface>
        </ScrollView>
        </Provider>
    )
}


