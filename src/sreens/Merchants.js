import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";

const Merchants = ({ data, navigation }) => {
  console.log(data);
  return (
    <View>
      <FlatList
        data={data}
        itme
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback onPress={()=>navigation.navigate('details',{item})}>
              <View style={styles.merchantCard}>
                <Text style={styles.text}>{item.name}</Text>
                <AntDesign name="right" size={24} color="black" />
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
};

function mstp(state) {
  // console.log(state.main.merchant)
  return {
    data: state.main.merchant,
  };
}

export default connect(mstp)(Merchants);

const styles = StyleSheet.create({
  merchantCard: {
    width: "100%",
    height: 70,
    borderBottomColor: "teal",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textTransform: "capitalize",
  },
});
