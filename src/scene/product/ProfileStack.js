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
import CheckOut from './screens/CheckOut';
import OrderDetail from './screens/OrderDetail';
import ReviewPage from './screens/ReviewPage';
import ReviewProduct from './screens/ReviewProduct';
import { YetRoute } from './screens/ReviewPage';
import { AlreadyRoute } from './screens/ReviewPage';
import ReviewProductList from './screens/ReviewProductList';
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
            <Stack.Screen name="CheckOut" component={CheckOut} options={{headerTitle: "Trang thanh toán"}}></Stack.Screen>
            <Stack.Screen name="OrderDetail" component={OrderDetail} options={{headerTitle: "Trang chi tiết đơn hàng"}}></Stack.Screen>
            <Stack.Screen name="ReviewPage" component={ReviewPage} options={{headerTitle: "Đánh giá sản phẩm"}}></Stack.Screen>
            <Stack.Screen name="ReviewProduct" component={ReviewProduct} options={{headerTitle: "Đánh giá"}}></Stack.Screen>
            <Stack.Screen name="YetRoute" component={YetRoute} options={{headerTitle: "Đánh giá"}}></Stack.Screen>
            <Stack.Screen name="AlreadyRoute" component={AlreadyRoute} options={{headerTitle: "Đánh giá"}}></Stack.Screen>
            <Stack.Screen name="ReviewDetail" component={ReviewProductList} options={{headerTitle: "Đánh giá sản phẩm"}}></Stack.Screen>

    </Stack.Navigator>
  )
}