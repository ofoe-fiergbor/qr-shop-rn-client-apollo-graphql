import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Navbar = ({navigation}) => {
  const { image, container } = styles;
  return (
    <View style={container}>
      <Text>Logo</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('profile')}>
        <Image source={require("./assets/jenny.jpg")} style={image} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 15
  },
  container:{
      flexDirection: 'row',
      justifyContent: 'space-between'
  }
});
