import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();

import Home from './screens/Home';
import {ProductDetail} from './screens/ProductDetail';
import ProductsInCategory from './screens/ProductsInCategory';
import { SearchProduct } from './screens/SearchProduct';
import AllProducts from './screens/AllProducts';
import Carts from './screens/Carts';
import CheckOut from './screens/CheckOut';

export default function HomeStack() {
  return (
    <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="SearchProduct" component={SearchProduct} options={{headerTitle: ""}}></Stack.Screen>
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerTitle: ""}}></Stack.Screen>
            <Stack.Screen name="AllProducts" component={AllProducts} options={{headerTitle: ""}}></Stack.Screen>
            <Stack.Screen name="Carts" component={Carts} options={{headerTitle: "Giỏ hàng"}}></Stack.Screen>
            <Stack.Screen name="CheckOut" component={CheckOut} options={{headerTitle: "Trang thanh toán"}}></Stack.Screen>
            <Stack.Screen name="ProductsInCategory" component={ProductsInCategory} options={{headerTitle: ""}}></Stack.Screen>
    </Stack.Navigator>
  )
}