import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../component/assets/photo-1600147131759-880e94a6185f.jpg")}
        style={{ height: "100%", width: "100%" }}
      />
      <Text
        style={{
          position: "absolute",
          fontSize: 40,
          color: "#fff",
          elevation: 10,
          top: 200,
          fontWeight: "bold",
        }}
      >
        QR Store
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={styles.button}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Get Started</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "teal",
    width: "60%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    borderRadius: 15,
  },
});
