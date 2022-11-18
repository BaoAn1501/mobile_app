import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyAddresses = () => {
  return (
    <View>
      <View item>
        <Text>sdt</Text>
        <Text>number + street</Text>
        <Text>ward + district + city</Text>
      </View>
    </View>
  )
}

export default MyAddresses

const styles = StyleSheet.create({})

var addresses = [
    {
        "number": "12",
        "street": "Quang Trung",
        "ward": "10",
        "district":"Go Vap",
        "city":"HCM",
        "phone_number":"01231231231"
    },
    {
        "number": "12",
        "street": "Quang Trung",
        "ward": "10",
        "district":"Go Vap",
        "city":"HCM",
        "phone_number":"01231231231"
    },
    {
        "number": "12",
        "street": "Quang Trung",
        "ward": "10",
        "district":"Go Vap",
        "city":"HCM",
        "phone_number":"01231231231"
    }
]