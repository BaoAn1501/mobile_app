import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'

const CustomDrawer = (props) => {
  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}
            contentContainerStyle={{backgroundColor: 'Orange'}}>
                <ImageBackground source={require('')} style={{padding: 20}}>
                    <Image source={require('')} style={{height: 80, width: 80, borderRadius: 40, borderWidth: 2, marginBottom: 10}} />
                    <Text style={{color: 'orange', fontSize: 16}}>Uyên Trang</Text>
                </ImageBackground>

            <DrawerItemList {...props} />
            <View style={{flex: 1, backgroundColor: 'white', padding: 10, fontSize: 15}}></View>
        </DrawerContentScrollView>
        <View>
            <Text>Custom Text</Text>
        </View>
    </View>
    
  )
}
const styles = StyleSheet.create({

})
export default CustomDrawer
