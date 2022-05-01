import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Home from './App/Screens/Home/Home'
import AddService from './App/Screens/ManageServices/AddService';
import EditService from './App/Screens/ManageServices/EditService';
import ManageServicesHome from './App/Screens/ManageServices/ManageServicesHome';
import PaymentHistoryHome from './App/Screens/PaymentHistory/PaymentHistoryHome';
import ServicePaymentHistory from './App/Screens/PaymentHistory/ServicePaymentHistory';
import MakePayment from './App/Screens/PaymentsHome/MakePayment';
import PaymentsHome from './App/Screens/PaymentsHome/PaymentsHome';
import { screenAddService, screenEditService, screenMakePayment, screenManageServices, screenPaymentHistory, screenPaymentsHome, screenServicePaymentHistory } from './App/Screens/ScreenNames';

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name={`${screenManageServices}`} component={ManageServicesHome} />
        <Stack.Screen name={`${screenPaymentsHome}`} component={PaymentsHome} />
        <Stack.Screen name={`${screenPaymentHistory}`} component={PaymentHistoryHome} />
        <Stack.Screen name={`${screenAddService}`} component={AddService} />
        <Stack.Screen name={`${screenEditService}`} component={EditService} />
        <Stack.Screen name={screenMakePayment} component={MakePayment} />
        <Stack.Screen name={screenServicePaymentHistory} component={ServicePaymentHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
