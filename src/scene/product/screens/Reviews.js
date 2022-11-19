import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TabItem } from '@rneui/base/dist/Tab/Tab.Item'

const Reviews = () => {
  return (
    <View>
      <Text>Reviews</Text>
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({})

var data = [
    {
        "user": {
            "id": "123",
            "name":"nobita",
            "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        },
        "review":{
            "id":"1",
            "score": 4.5,
            "remarks": "tot"
        },
        "date": "24/12/2022 18:20"
    },
    {
        "user": {
            "id": "123",
            "name":"nobita",
            "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        },
        "review":{
            "id":"1",
            "score": 4.5,
            "remarks": "tot"
        },
        "date": "24/12/2022 18:20"
    },
    {
        "user": {
            "id": "123",
            "name":"nobita",
            "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        },
        "review":{
            "id":"1",
            "score": 4.5,
            "remarks": "tot"
        },
        "date": "24/12/2022 18:20"
    }
]