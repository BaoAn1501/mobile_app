import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContextProvider } from './src/scene/user/UserContext';
import Navigation from './src/scene/navigation/Navigation';
import { ProductContextProvider } from './src/scene/product/ProductContext';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
  <UserContextProvider>
    <ProductContextProvider>
      <StripeProvider publishableKey="pk_test_51LPij0Kion7mEBKlNW56OUEVtw8JuTevK6TdBd2yN8rRdufUGVDbzItBTzUnrcDqz3daMz2kQxMlEJSTxOd8xAAH00xlB2k9wP">
      <Navigation/>
      </StripeProvider>
    </ProductContextProvider>
  </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
