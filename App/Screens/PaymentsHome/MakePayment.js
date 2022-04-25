import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import { Provider, Surface,Title } from 'react-native-paper'
import PickAmount from './PaymentOptions/PickAmount'
import PickDate from './PaymentOptions/PickDate'
import PickMethod from './PaymentOptions/PickMethod'
import PickMonth from './PaymentOptions/PickMonth'

export default function MakePayment({navigation, route}){

    const [service, setService] = React.useState(route.params?.service? route.params.service : null )
    const [month, setMonth] = React.useState(null)
    const [date, setDate] = React.useState(null)
    const [amount, setAmount] = React.useState(null)
    const [paymentMethod, setPaymentMethod] = React.useState(null)
    let valueError = false

    return (
        <Provider>
        <View>
        <Surface style={styles.surface}>
            <Title>{service.serviceName}</Title>
                {service.monthly && <PickMonth month={month} setMonth={setMonth}/>}
                {!service.monthly && <PickDate date={date? date : new Date()} setDate={setDate}/>}
                {service.fixedAmount && <Title>Amount : {`${service.amount}`}</Title>}
                {!service.fixedAmount && <PickAmount amount={amount} setAmount={setAmount} error={valueError}/>}
                <PickMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
        </Surface>
        </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    surface :{
        padding:20,
        height : '100%'
    }
})


