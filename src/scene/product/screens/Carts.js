import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Carts = () => {
  return (
    <View>
      <Text>Carts</Text>
    </View>
  )
}

export default Carts

const styles = StyleSheet.create({})

// size = cart.productSize_id.size_id.size_symbol;
// price = cart.productSize_id.price;
// image = cart.productSize_id.product_id.image1;
// quantity = cart.quantity;
// name = cart.productSize_id.product_id.name;

var carts = [
    { // cart
      "_id": "63760ecbb48c46de53df8510",
      "productSize_id": {
        "_id": "635bb92416c74c1068deccd9",
        "size_id": "6356bff812392326d6c82c8f",
        "product_id": "635bb92416c74c1068deccd6",
        "price": 11,
        "deleted": false,
        "createdAt": "2022-10-28T11:12:36.610Z",
        "updatedAt": "2022-10-29T00:12:22.898Z",
        "__v": 0
      },
      "user_id": {
        "_id": "635b993222cdefc4bdb25e7b",
        "full_name": "bao an",
        "email": "an@gmail.com",
        "password": "$2a$10$Eu/RwCSy1uVQnysq/ZhUv.B9Bl1weZ9JJajtahrKFKj/FBvp2KIdW",
        "phone_number": "0934041111",
        "createdAt": "2022-10-28T08:56:18.190Z",
        "updatedAt": "2022-10-28T08:56:18.190Z",
        "__v": 0
      },
      "quantity": 3
    },
    {
      "_id": "637627fd9b77f77efa5a509b",
      "productSize_id": {
        "_id": "635bcf378cf462b73ca1c1d5",
        "size_id": "6356bffd12392326d6c82c93",
        "product_id": "635bcf378cf462b73ca1c1d1",
        "price": 15,
        "deleted": false,
        "createdAt": "2022-10-28T12:46:47.546Z",
        "updatedAt": "2022-11-10T05:19:27.233Z",
        "__v": 0
      },
      "user_id": {
        "_id": "635b993222cdefc4bdb25e7b",
        "full_name": "bao an",
        "email": "an@gmail.com",
        "password": "$2a$10$Eu/RwCSy1uVQnysq/ZhUv.B9Bl1weZ9JJajtahrKFKj/FBvp2KIdW",
        "phone_number": "0934041111",
        "createdAt": "2022-10-28T08:56:18.190Z",
        "updatedAt": "2022-10-28T08:56:18.190Z",
        "__v": 0
      },
      "quantity": 2
    }
  ]