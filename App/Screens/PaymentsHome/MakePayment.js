import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Provider, Surface, Title} from 'react-native-paper';
import PaymentObject from '../../ViewModel/PaymentObject';
import {markPayment} from '../../ViewModel/Payments';
import PickAmount from './PaymentOptions/PickAmount';
import PickDate from './PaymentOptions/PickDate';
import PickMethod from './PaymentOptions/PickMethod';
import PickMonth from './PaymentOptions/PickMonth';

export default function MakePayment({navigation, route}) {
  const [service, setService] = React.useState(
    route.params?.service ? route.params.service : null,
  );

  //data for payment object
  const [month, setMonth] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [amount, setAmount] = React.useState(
    service.amount ? service.amount : null,
  );
  const [paymentMethod, setPaymentMethod] = React.useState(null);

  //error handling
  const [amountError, setAmountError] = React.useState(false);
  const [monthError, setMonthError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [methodError, setMethodError] = React.useState(false);

  function resetErrors() {
    setAmountError(false);
    setMonthError(false);
    setDateError(false);
    setMethodError(false);
  }

  const savePayment = async () => {
    resetErrors();
    let monthE,
      dateE,
      amountE,
      methodE = false;
    if (service.monthly === true && month === null) {
      monthE = true;
    }

    if (service.monthly === false && date === null) {
      dateE = true;
    }

    if (service.fixedAmount === false && amount === null) {
      amountE = true;
    }

    if (paymentMethod === null) {
      methodE = true;
    }

    if (monthE || dateE || amountE || methodE) {
      console.log('Error');
      console.log(
        'Errors :\n month\tdate\tamount\tmethod\n',
        monthE,
        dateE,
        amountE,
        methodE,
      );
      if (monthE) setMonthError(true);
      if (dateE) setDateError(true);
      if (amountE) setAmountError(true);
      if (methodE) setMethodError(true);
      return;
    }

    const payment = new PaymentObject(
      service.serviceName,
      date?.toLocaleDateString(),
      amount,
      month,
      paymentMethod,
    );

    const res = await markPayment(service.serviceName, payment);
    if (res.result === true) {
      console.log('success');
    } else {
      console.log('Failed to save payment');
    }
  };

  return (
    <Provider>
          <ScrollView style={{flexGrow:1, backgroundColor:'white'}}>
          <Surface style={styles.surface}>
            <Title>{service.serviceName}</Title>
            {service.monthly && (
              <PickMonth month={month} setMonth={setMonth} error={monthError} />
            )}
            {!service.monthly && (
              <PickDate
                date={date ? date : new Date()}
                setDate={setDate}
                error={dateError}
              />
            )}
            {service.fixedAmount && (
              <Title>Amount : {`${service.amount}`}</Title>
            )}
            {!service.fixedAmount && (
              <PickAmount
                amount={amount}
                setAmount={setAmount}
                error={amountError}
              />
            )}
            <PickMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              error={methodError}
            />
            <Button
              onPress={() => {
                savePayment();
              }}>
              Save Payment
            </Button>
          </Surface>
          </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    height:'100%',
  },
  margin: {
    height: '100%',
  },
});
