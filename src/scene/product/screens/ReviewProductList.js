import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Image } from "react-native";
import React, {useState, useContext, useEffect} from "react";
import { ProductContext } from "../ProductContext";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { IP } from "../../../utils/constants";

const ReviewProductList = (props) => {
    const {
        navigation,
        route: {
          params: { id },
        },
      } = props;
    const {onReviewAll} = useContext(ProductContext);
    const [list, setList] = useState([]);
    useEffect(()=>{
        (async function GetReviewsList(){
            const res = await onReviewAll(id);
            if(res){
                setList(res);
            }
        })()
    }, [list]);

    function convertIP(image) {
        image = image.replace("localhost", IP);
        return image;
    }

    const SetTime = (time) => {
        return String(time).slice(0, 19).replace('T', ' ');
    }

    const RenderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}> 
                        <Image 
                            style={styles.image} 
                            resizeMode='cover'
                            source={{ uri: 'https://www.pngitem.com/pimgs/m/391-3918613_personal-service-platform-person-icon-circle-png-transparent.png' }} 
                        />
                        <View style={{marginHorizontal: 20}}>
                            <Text style={styles.titleTen}>{item.user_id.full_name}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Rating
                                    type='custom'
                                    ratingColor='#FFC107'
                                    ratingBackgroundColor='#FFFFFF'
                                    ratingCount={5}
                                    imageSize={17}
                                    startingValue={item.score}
                                    style={{ paddingVertical: 10 }} 
                                />
                                <Text style={{marginStart: 10}}>( {item.score} )</Text>
                            </View>
                        </View>
                    </View>
                    <Text>{SetTime(item.updatedAt)}</Text>
                </View>
                <Text style={{marginLeft: 70}}>Bình luận: {item.remarks}</Text>
            </View>
        );
    };
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    {
                        list.length > 0 ?
                        <FlatList
                            data={list}
                            renderItem={RenderItem}
                            keyExtractor={item => item._id}
                        />
                        : 
                        <Text>Sản phẩm chưa được đánh giá</Text>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReviewProductList;

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        padding: 10
    },

    itemContainer: {
        padding: 8,
        marginBottom: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    
    image: {
        width: 50,
        height: 50,
        borderRadius: 200 / 2
    },
});
