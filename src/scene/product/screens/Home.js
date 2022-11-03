import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable, StatusBar, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
const { width, height } = Dimensions.get("window")
import { ProductContext } from "../ProductContext";
import { useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { IP } from '../../../utils/constants';

const HomeScreen = (prop) => {
    const { onGetCategoriesForHomePage, onGetProductsForHomePage } = useContext(ProductContext);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        async function getCategories () {
            const res1 = await onGetCategoriesForHomePage();
            console.log('getCategories in UI: ', res1);
            setCategories(res1);
        }
        async function getProducts () {
            const res2 = await onGetProductsForHomePage();
            console.log('getProducts in UI: ', res2);
            setProducts(res2);
        }
        getCategories();
        getProducts();
        console.log(IP, 'IP');
    }, [])

    function convertIP (image) {
        image = image.replace('localhost', IP);
        return image;
    }

    return (
        <SafeAreaView >
            <ScrollView>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle={"dark-content"} />
                    <View style={styles.headerContainer}>
                        <FontAwesome style={styles.avatarImage} name="user-circle" size={32} color="black" />
                        <Text style={styles.usernameText}>Bình Thạnh</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <FontAwesome5 style={styles.searchIcon} name="search" size={18} color="black" />
                        <TextInput
                            placeholder="Tìm món"
                            editable={false}
                        />
                    </View>
                    <View style={styles.besideCategories}>
                    
                    <View style={styles.categoriesContainer}>
                        {
                            categories.map(item => {
                                return (
                                    <TouchableOpacity style={styles.categoryItem} onPress={function(){
                                        console.log('click show id: ', item.image);
                                    }}>
                                        
                                        <Image style={styles.imageCategoryItem} resizeMode='cover' source={{uri: convertIP(item.image)}}/>
                                        <Text numberOfLines={1}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    </View>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            Uống gì hôm nay?
                        </Text>
                        <Entypo name="chevron-right" size={24} color="black" />
                    </View>
                    <View style={styles.productsContainer}>
                        {
                            products.map(item => {
                                return (
                                    <TouchableOpacity style={styles.productItem}>
                                        <Image style={styles.productImageItem} source={{uri: convertIP(item.image1)}} />
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )

}
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    usernameText: {
        marginLeft: 20
    },
    searchContainer: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white'
    },
    searchIcon: {
        marginHorizontal: 10
    },
    categoriesContainer: {
        // paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    categoryItem: {
        direction: 'flex',
        flexDirection: 'column',
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        width: '27%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    imageCategoryItem: {
        width: 40,
        height: 40,
        margin: 5
    },
    questionContainer: {
        backgroundColor: 'white',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        fontWeight: 'bold',
        borderRadius: 8,
        alignItems: 'center'
    },
    questionText: {
        fontWeight: 'bold'
    },
    productsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    productItem: {
        direction: 'flex',
        flexDirection: 'column',
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        width: '40%',
        height: 'auto',
        alignItems: 'center',
        margin: 10,
        padding: 10
    },
    productImageItem: {
        width: '60%',
        height: 80,
        backgroundColor:'red'
    }
    

})