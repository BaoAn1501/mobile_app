import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, {Component} from "react";
import { ScrollView } from "react-native-gesture-handler";
// const { width } = Dimensions.get("window").width * 0.6;
const width = 100;
const height = width;

class Slider extends Component {
  render() {
    const {images} = this.props;
    return (
      <View style={{width, height}}>
        <ScrollView style={{width, height}} horizontal>
          {images.map((image, index) => {
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width, height, resizeMode: "contain" }}
            />;
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Slider;

const styles = StyleSheet.create({});
