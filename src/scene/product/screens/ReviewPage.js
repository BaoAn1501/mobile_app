import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import React, {useState, useEffect, useContext} from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { IP } from "../../../utils/constants";
import { UserContext } from "../../user/UserContext";
import { FlatList } from 'react-native-gesture-handler';

function convertIP(image) {
  image = image.replace("localhost", IP);
  return image;
}

const SetTime = (time) => {
  return String(time).slice(0, 19).replace('T', ' ');
}

export const YetRoute = (props) => {
  const {navigation} = props;
  const {userID, onGetReviewsYet} = useContext(UserContext);
  const [reviews, setReviews] = useState([]);

  useEffect(()=>{
    (async function GetReviews(){
      const res = await onGetReviewsYet(userID);
      console.log('get reviews list: ', res);
      if(res){
        setReviews(res);
      }
    })();
  }, [reviews]);
  
  const RenderItem1 = ({item}) => {
    return(
      <View style={styles.item1}>
        <View style={{flexDirection: 'row', width: 200}}>
          <Image style={{height: 50, width: 50}} source={{uri: convertIP(item.product_id.images[0])}}/>
          <View style={{marginLeft: 20, paddingVertical: 10}}>
            <Text>{SetTime(item.updatedAt)}</Text>
            <Text style={{marginTop: 10}} numberOfLines={1}>Tên món: {item.product_id.name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("ReviewProduct", {id: item._id})}>
          <Text style={{color: 'green'}}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{justifyContent: 'center', padding: 8}}>
          {
            reviews.length > 0 ?
            <FlatList
              data={reviews}
              renderItem={RenderItem1}
              keyExtractor={item => item._id}
            /> :
            <View>
              <Text numberOfLines={1} style={{marginHorizontal: 32}}>Không có sản phẩm nào chưa được đánh giá</Text>
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AlreadyRoute = (props) => {
  const {navigation} = props;
  const {userID, onGetReviewsAlready} = useContext(UserContext);
  const [reviews, setReviews] = useState([]);

  useEffect(()=>{
    (async function GetReviews(){
      const res = await onGetReviewsAlready(userID);
      if(res){
        setReviews(res);
      }
    })();
  }, [reviews]);
  
  const RenderItem2 = ({item}) => {
    return(
      <View style={styles.item1}>
        <View style={{flexDirection: 'row'}}>
          <Image style={{height: 50, width: 50}} source={{uri: convertIP(item.product_id.images[0])}}/>
          <View style={{marginLeft: 20, paddingVertical: 10}}>
            <Text>Thời gian: {SetTime(item.updatedAt)}</Text>
            <Text style={{marginTop: 10}}>Tên món: {item.product_id.name}</Text>
            <Rating
              style = {{marginVertical: 8}}
              type='star'
              ratingColor="yellow"
              ratingCount={5}
              startingValue={item.score}
              imageSize={20}
              readonly
          />
          <Text>Bình luận:</Text>
          <Text>{item.remarks}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{justifyContent: 'center', padding: 8}}>
          {
            reviews.length > 0 ?
            <FlatList
              data={reviews}
              renderItem={RenderItem2}
              keyExtractor={item => item._id}
            /> :
            <View>
              <Text numberOfLines={1} style={{marginHorizontal: 32}}>Không có sản phẩm nào chưa được đánh giá</Text>
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const ReviewPage = (props) => {
  const {navigation} = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'yet', title: 'Chưa đánh giá' },
    { key: 'already', title: 'Đã đánh giá' },
  ]);
  
  const renderScene = SceneMap({
    yet: () => YetRoute({navigation}),
    already: () => AlreadyRoute({navigation}),
  });

  return (
    <TabView
      navigationState={{ index, routes, navigation }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default ReviewPage

const styles = StyleSheet.create({
  item1: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})