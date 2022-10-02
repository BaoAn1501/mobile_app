import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserStack from './src/scene/user/UserStack';
import ChangePassword from './src/scene/user/screens/ChangePassword';
import { CustomerNavigation} from './src/scene/product/CustomerNavigation';
import { UserContextProvider } from './src/scene/user/UserContext';
import Navigation from './src/scene/navigation/Navigation';
export default function App() {
  return (
    <UserContextProvider>
      <Navigation/>
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
