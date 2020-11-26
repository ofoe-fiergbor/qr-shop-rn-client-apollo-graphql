import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Image,
  Activi,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FETCH_ALL_MERCHANTS } from "../graphql/merchant";
import { useQuery } from "@apollo/client";
import { connect } from "react-redux";

import { scanMerchants } from "../redux/action";

const Result = ({ route, navigation, scanMerchants, scannedMerchant }) => {
  const { data } = route.params;

  const allMerchants = useQuery(FETCH_ALL_MERCHANTS);

  const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const merchant =
    data.match(checkForHexRegExp) &&
    allMerchants.data &&
    allMerchants.data.getMerchants.filter((item) => item.id === data);

  // const { createdAt, email, id, items, likes, name, username } = merchant[0];
  // console.log(merchant)
  const resultRender = !merchant ? (
    <View style={styles.errorMode}>
      <AntDesign name="qrcode" size={250} color="grey" />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "grey",
          textAlign: "center",
        }}
      >
        Omo....{"\n"}scan a valid QR store
      </Text>
    </View>
  ) : (
    <FlatList
      ListHeaderComponent={() => (
        <Text style={styles.merchantName}>{merchant[0].name}</Text>
      )}
      data={merchant[0].items}
      renderItem={({ item }) => {
        return (
          <TouchableWithoutFeedback>
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemImage}
                source={require("../component/assets/matthew.png")}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.name}>{item.itemName}</Text>
                <Text style={styles.price}>GHC {item.price}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
  return (
    <View style={{ paddingVertical: 40, paddingHorizontal: 20 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("home")}
        style={{ alignSelf: "flex-end" }}
      >
        <AntDesign name="close" size={40} color="black" />
      </TouchableOpacity>

      {allMerchants.loading ? (
        <ActivityIndicator />
      ) : (
        <View>{resultRender}</View>
      )}
    </View>
  );
};

function mstp(state) {
  return {
    scannedMerchant: state.main.scannedMerchant,
  };
}
export default connect(mstp, { scanMerchants })(Result);

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
  },
  itemImage: {
    height: 100,
    width: 120,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    width: 180,
  },
  price: {
    fontWeight: "bold",
    color: "grey",
  },
  merchantName: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 20,
    marginTop: 10,
  },
  errorMode: {
    width: "100%",
    height: 500,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
