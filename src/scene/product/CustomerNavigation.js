
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from "react-native";
import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {EditProfile} from './screens/EditProfile'
import {ProductDetail} from './screens/ProductDetail'
import {Profile} from './screens/Profile'
import {SearchProduct} from './screens/SearchProduct'

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const Tabs = createBottomTabNavigator();


export const CustomerNavigation = () => {
    return(
        <NavigationContainer>
            <Tabs.Navigator screenOptions={({route})=>({




                tabBarIcon: ({focused,color,size}) =>{


                        if(focused){
                                
                      if(route.name == "Home"){
                        return   <Entypo name="home" size={30} color="#52CC6D" />
                       }else if(route.name == "Cart"){
                           return  <FontAwesome5 name="shopping-cart" size={24} color="#52CC6D" />
                       }else if(route.name == "Message"){
                           return <MaterialCommunityIcons name="message-text" size={30} color="#52CC6D" />
                       }else if(route.name == "User"){
                           return <FontAwesome5 name="user-alt" size={24} color="#52CC6D" />
                       }

                        }else{
                            if(route.name == "Home"){
                                return    <Entypo name="home" size={30} />
                               }else if(route.name == "Cart"){
                                   return <FontAwesome5 name="shopping-cart" size={24} />
                               }else if(route.name == "Message"){
                                   return <MaterialCommunityIcons name="message-text" size={30}  />
                               }else if(route.name == "User"){
                                   return <FontAwesome5 name="user-alt" size={24} />
                               }
                        }


            },

            
            // tabBarLabel: ({focused}) => {
            //     if(focused){
            //         if(route.name == "EditProfile"){
            //             return <Icon size={4} name="circle"/>
            //         }else if(route.name == "Chat"){
            //             return <Icon size={4} name="circle"/>
            //         }else if(route.name == "Receipt"){
            //             return <Icon size={4} name="circle"/>
            //         }else if(route.name == "Profile"){
            //             return <Icon size={4} name="circle"/>
            //         }   
            //     } else {
            //         return null
            //     }
            // },
                headerShown: false
            })}>
                <Tabs.Screen name="Home" component={EditProfile}></Tabs.Screen>
                <Tabs.Screen name="Cart" component={ProductDetail}></Tabs.Screen>
                <Tabs.Screen name="Message" component={Profile}></Tabs.Screen>
                <Tabs.Screen name="User" component={SearchProduct}></Tabs.Screen>
            </Tabs.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    icons: {
        color: 'black',
        fontSize: 24,
    },
    dot: {
        color: 'black',
        fontSize: 8,
    }

    
})