import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserStack from './src/scene/user/UserStack';
import ChangePassword from './src/scene/user/screens/ChangePassword';
import { CustomerNavigation} from './src/scene/product/CustomerNavigation';
export default function App() {
  return (
    // <UserStack></UserStack>
    // <ChangePassword/>
    <CustomerNavigation/>
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
