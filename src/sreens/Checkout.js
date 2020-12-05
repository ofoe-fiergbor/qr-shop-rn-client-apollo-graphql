import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Checkout = ({ route }) => {
  const { items } = route.params;

  const [checkOut, setCheckOut] = useState(false);

  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const summation = (items) => {
    let bill = items.reduce((n, { price }) => n + parseFloat(price), 0);
    return format(bill);
  };

  return (
    <View style={{ paddingHorizontal: 30 }}>
      {!checkOut ? (
        <View>
          <FlatList
            data={items}
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              paddingBottom: 20,
              marginTop: 150,
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.items}>
                  <Text style={{ flex: 3 }}>{item.itemName}</Text>
                  <Text style={{ flex: 1 }}>{format(item.price)}</Text>
                </View>
              );
            }}
          />

          <View style={styles.items}>
            <Text style={{ flex: 3, fontWeight: "bold" }}>Total</Text>
            <Text style={{ flex: 1.2, fontWeight: "bold" }}>
              {summation(items)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => setCheckOut(true)}
          >
            <Text style={styles.checkOutTxt}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="gears" size={130} color="grey" />

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => setCheckOut(false)}
          >
            <Text style={styles.checkOutTxt}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  items: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  checkoutBtn: {
    alignSelf: "center",
    backgroundColor: "teal",
    height: 60,
    width: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  checkOutTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
