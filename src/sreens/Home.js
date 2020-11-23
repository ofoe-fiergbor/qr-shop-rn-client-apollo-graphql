import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";

import Navbar from "../component/Navbar";

const Home = ({ navigation, user }) => {
  const {
    container,
    hello,
    name,
    qrbutn,
    introTextContainter,
    formContainer,
    input,
    search,
    emptyBody,
    emptyBodyText,
  } = styles;
  return (
    <View style={container}>
      <Navbar navigation={navigation} />
      <View style={introTextContainter}>
        <Text style={hello}>Hello,</Text>
        {user && <Text style={name}>{user.username}</Text>}
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={qrbutn}
          onPress={() => navigation.navigate("scanner")}
        >
          <AntDesign name="qrcode" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

function mstp(state) {
  // console.log(state.auth);
  return {
    user: state.auth.user,
  };
}

export default connect(mstp)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  hello: {
    fontSize: 40,
    fontWeight: "normal",
    color: "navy",
  },
  name: {
    textTransform: "capitalize",
    fontSize: 40,
    fontWeight: "700",
  },
  introTextContainter: {
    marginVertical: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    width: 100,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "navy",
    borderBottomWidth: 1,
  },
  input: {
    width: "90%",
  },
  search: {
    // backgroundColor: "orange",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  emptyBody: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
    // backgroundColor: "red",
  },
  emptyBodyText: {
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
    marginTop: 20,
    color: "#acd9e6",
    fontWeight: "bold",
  },
  qrbutn: {
    backgroundColor: "orange",
    height: 49,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "teal",
    borderRadius: 15,
  },
});
