import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Home from './App/Screens/Home/Home'
import ManageServicesHome from './App/Screens/ManageServices/ManageServicesHome';
import PaymentHistoryHome from './App/Screens/PaymentHistory/PaymentHistoryHome';
import PaymentsHome from './App/Screens/PaymentsHome/PaymentsHome';
import { screenManageServices, screenPaymentHistory, screenPaymentsHome } from './App/Screens/ScreenNames';

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name={`${screenManageServices}`} component={ManageServicesHome} />
        <Stack.Screen name={`${screenPaymentsHome}`} component={PaymentsHome} />
        <Stack.Screen name={`${screenPaymentHistory}`} component={PaymentHistoryHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
