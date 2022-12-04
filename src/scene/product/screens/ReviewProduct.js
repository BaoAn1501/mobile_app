import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, {useContext, useState, useEffect} from "react";
import { TabItem } from "@rneui/base/dist/Tab/Tab.Item";
import { UserContext } from "../../user/UserContext";
import { Rating, AirbnbRating } from 'react-native-ratings';

const ReviewProduct = (props) => {
  const {
    navigation,
    route: {
      params: { id },
    },
  } = props;

  const { userID, onRate } = useContext(UserContext);
  const [score, setScore] = useState('');
  const [remarks, setRemarks] = useState('');
  
  async function Rate () {
    const body = {
        score: score,
        remarks: remarks
    }
    console.log('data input: ', body);
    const res = await onRate(userID, id, body)
    if(res){
        if(res.message){
            ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
        }
        navigation.navigate("ReviewPage");
    }
  }

  return (
    <View style={{}}>
      <Rating
        type='star'
        ratingColor="yellow"
        ratingCount={5.0}
        startingValue={5.0}
        minValue={1}
        onSwipeRating={true}
        jumpValue={0.5}
        imageSize={40}
        showRating
        onFinishRating={(score) => setScore(score)}
    />
    <TextInput
        style={{paddingHorizontal: 10, marginHorizontal: 20, backgroundColor: 'white', marginTop: 20, borderWidth: 1}}
        multiline={true}
        numberOfLines={4}
        placeholder="Bình luận"
        onChangeText={(text) => setRemarks(text)}
        value={remarks}/>
    <TouchableOpacity onPress={()=>Rate()} style={{marginHorizontal: 36, marginTop: 20, backgroundColor: 'green', borderRadius: 8, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Đánh giá</Text>
    </TouchableOpacity>
    </View>
  );
};

export default ReviewProduct;

const styles = StyleSheet.create({

});