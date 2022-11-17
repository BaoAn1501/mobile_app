import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductsInCategory = (props) => {
  const { navigation, route: { params: { id } } } = props;
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default ProductsInCategory

const styles = StyleSheet.create({})