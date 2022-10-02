import { View, Text } from 'react-native';
import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../user/UserContext';
import CustomerScreens from '../product/CustomerScreens';
import ManagerBottomNavigation from '../product/ManagerBottomNavigation';
import UserStack from '../user/UserStack';

export default function Navigation() {
    const { isLogged } = useContext(UserContext);
    const { role } = useContext(UserContext);
    return (
        <NavigationContainer>
            {
                isLogged == true ? 
                (role=='customer' ? <CustomerScreens/> : <ManagerBottomNavigation/>)
                : <UserStack/>
            }
        </NavigationContainer>
    )
}