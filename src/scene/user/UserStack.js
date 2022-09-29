import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();

import SignIn from './screens/Login';
import SignUp from './screens/Register';
import ForgotPass from './screens/Forgot';
import { NavigationContainer } from '@react-navigation/native';

export default function UserStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={SignIn} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="Register" component={SignUp} options={{headerTitle: ""}}></Stack.Screen>
            <Stack.Screen name="Forgot" component={ForgotPass} options={{headerTitle: ""}}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}