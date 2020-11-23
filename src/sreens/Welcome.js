import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const Welcome = ({ navigation }) => {
  return (
    <View style={{
        backgroundColor:'#fff',
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    }}>
      <Text>Welcome Screen</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={{
          backgroundColor: "pink",
          width: "40%",
          height: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Get Started</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
      
    </View>
  );
};

export default Welcome;
