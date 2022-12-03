
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from "react-native";
import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import HomeStack from "./HomeStack";
import Chat from "./screens/Chat";
import Ordering from "./screens/Ordering";
import ProfileStack from './ProfileStack';

const Tabs = createBottomTabNavigator();
export const CustomerNavigation = () => {
    return(
       
            <Tabs.Navigator screenOptions={({route})=>({
                tabBarIcon: ({focused,color,size}) =>{
                    if(focused){
                        if(route.name == "Home"){
                            return <Entypo name="home" size={30} color="#52CC6D" />
                        } else if(route.name == "Chat"){
                            return <MaterialCommunityIcons name="message-text" size={30} color="#52CC6D" />
                        } else if(route.name == "Profile"){
                            return <FontAwesome5 name="user-alt" size={24} color="#52CC6D" />
                        } else if(route.name == "Ordering"){
                            return <Ionicons name="receipt" size={24} color="#52CC6D"/>
                        }
                    } else {
                        if(route.name == "Home"){
                            return <Entypo name="home" size={30} />
                        } else if(route.name == "Chat"){
                            return <MaterialCommunityIcons name="message-text" size={30}  />
                        } else if(route.name == "Profile"){
                            return <FontAwesome5 name="user-alt" size={24} />
                        } else if(route.name == "Ordering"){
                            return <Ionicons name="receipt" size={24}/>
                        }
                    }
                },
                headerShown: false
            })}>
                <Tabs.Screen name="Home" component={HomeStack}></Tabs.Screen>
                <Tabs.Screen name="Chat" component={Chat}></Tabs.Screen>
                <Tabs.Screen name="Ordering" component={Ordering}></Tabs.Screen>
                <Tabs.Screen name="Profile" component={ProfileStack}></Tabs.Screen>
            </Tabs.Navigator>
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