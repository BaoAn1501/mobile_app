import { View, Text } from 'react-native';
import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../user/UserContext';
import { CustomerNavigation } from '../product/screens/BottomNavigation';
import UserStack from '../user/UserStack';

export default function Navigation() {
    const { isLogged } = useContext(UserContext);
    return (
        <NavigationContainer>
            {
                isLogged == true ? 
                <CustomerNavigation />
                : <UserStack/>
            }
        </NavigationContainer>
    )
}