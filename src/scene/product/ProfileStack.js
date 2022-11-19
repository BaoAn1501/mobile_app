import React from 'react'
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();

import Profile from './screens/Profile';
import {ChangeName} from './screens/ChangeName'
import Carts from './screens/Carts'
import HistoryShopping from './screens/HistoryShopping';
import MyAddresses from './screens/MyAddresses' 
import Cards from './screens/Cards';
import ChangePass from './screens/ChangePass';

import { EvilIcons } from '@expo/vector-icons';

export default function ProfileStack() {
  return (
    <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="ChangeName" component={ChangeName} options={{headerTitle: "Thay đổi thông tin"}}></Stack.Screen>
            <Stack.Screen name="ChangePass" component={ChangePass} options={{headerTitle: "Đổi mật khẩu"}}></Stack.Screen>
            <Stack.Screen name="Carts" component={Carts} options={{
              headerTitle: 'Giỏ hàng'
            }}></Stack.Screen>
            <Stack.Screen name="History" component={HistoryShopping} options={{headerTitle: "Lịch sử mua hàng"}}></Stack.Screen>
            <Stack.Screen name="Address" component={MyAddresses} options={{headerTitle: "Địa chỉ của tôi"}}></Stack.Screen>
            <Stack.Screen name="Cards" component={Cards} options={{headerTitle: "Liên kết thẻ ngân hàng"}}></Stack.Screen>
    </Stack.Navigator>
  )
}