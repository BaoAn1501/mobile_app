import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContextProvider } from './src/scene/user/UserContext';
import Navigation from './src/scene/navigation/Navigation';
import { ProductContextProvider } from './src/scene/product/ProductContext';
export default function App() {
  return (
  <UserContextProvider>
    <ProductContextProvider>
      <Navigation/>
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
