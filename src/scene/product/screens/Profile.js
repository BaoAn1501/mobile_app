import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const Profile =(props) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});