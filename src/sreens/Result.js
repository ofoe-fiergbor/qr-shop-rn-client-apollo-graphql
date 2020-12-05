import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FETCH_ALL_MERCHANTS } from "../graphql/merchant";
import { useQuery } from "@apollo/client";

const Result = ({ route, navigation }) => {
  const { data } = route.params;

  const allMerchants = useQuery(FETCH_ALL_MERCHANTS);
  const [selectedItem, setSelectedItem] = useState([]);

  const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const merchant =
    data.match(checkForHexRegExp) &&
    allMerchants.data &&
    allMerchants.data.getMerchants.filter((item) => item.id === data);

  var selectArr = [];
  var index;
  function onSelect(item) {
    if (selectArr.includes(item)) {
      index = selectArr.indexOf(item);
      selectArr.splice(index, 1);
    } else {
      selectArr.push(item);
    }

    // console.log(selectArr);
  }

  const items = [...new Set(selectedItem)];

  const deleteSelectedItem = (item) => {
    setSelectedItem(items.filter((i) => i.id !== item.id));
  };
  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

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
      ListFooterComponent={() => (
        <View>
          <ScrollView>
            {items.map((item, index) => {
              return (
                <View key={index} style={styles.selectedItem}>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  <Text style={styles.itemPrice}>{format(item.price)}</Text>
                  <TouchableOpacity onPress={() => deleteSelectedItem(item)}>
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          {selectedItem.length > 0 && (
            <TouchableOpacity
              style={styles.checkOutBtn}
              onPress={() => navigation.navigate("checkout", { items })}
            >
              <Text style={styles.checkOutTxt}>Proceed to checkout</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              onSelect(item), setSelectedItem((prev) => [...prev, item]);
            }}
          >
            <Image
              style={styles.itemImage}
              source={require("../component/assets/matthew.png")}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.name}>{item.itemName}</Text>
              <Text style={styles.price}>GHC {format(item.price)}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id}
      extraData={selectArr}
    />
  );
  return (
    <View style={{ paddingVertical: 40 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("home")}
        style={{ alignSelf: "flex-end", marginRight: 20 }}
      >
        <AntDesign name="close" size={40} color="black" />
      </TouchableOpacity>

      {allMerchants.loading ? (
        <ActivityIndicator color="teal" size="large" />
      ) : (
        <View>{resultRender}</View>
      )}
    </View>
  );
};

export default Result;

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
  checkOutBtn: {
    alignSelf: "center",
    backgroundColor: "teal",
    height: 60,
    width: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  checkOutTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  categoryselectedStyle: {
    backgroundColor: "orange",
  },
  selectedItem: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  itemName: {
    flex: 4,
  },
  itemPrice: {
    flex: 1,
  },
});
