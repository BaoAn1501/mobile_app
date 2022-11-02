// import React from "react";
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from "@react-navigation/native";
// const Drawer = createDrawerNavigator();
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import CustomDrawer from './CustomDrawer'
// export const MyDrawer =()=>{
//     return (
//         <NavigationContainer>
//             <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headerShown: false, drawerActiveBackgroundColor: '#ed7700', drawerActiveTintColor: '#ffffff', drawerLabelStyle: {
//                 fontSize: 15
//             }}}>
//             <Drawer.Screen name="Home" component={} options={{
//                 drawerIcon: ({color}) => (
//                     <Ionicons name="home-outline" size={20} color={'orange'}/>
//                 )
//             }} />
            
//             <Drawer.Screen name="Chat" component={} options={{
//                 drawerIcon: ({color}) => (
//                     <Ionicons name="chatbubble-ellipses-outline" size={20} color={'orange'}/>
//                 )
//             }} />
//             <Drawer.Screen name="Receipt" component={} options={{
//                 drawerIcon: ({color}) => (
//                     <Ionicons name="receipt" size={20} color={'orange'}/>
//                 )
//             }} />
//             {/* <Drawer.Screen name="Home" component={Home}/>
//             <Drawer.Screen name="Chat" component={Chat}/>
//             <Drawer.Screen name="Receipt" component={Receipt}/> */}
            
//             </Drawer.Navigator>
//         </NavigationContainer>
//     )
// }