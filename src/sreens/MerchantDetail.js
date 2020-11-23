import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { QRCode } from "react-native-custom-qr-codes-expo";
import { AntDesign } from "@expo/vector-icons";

const MerchantDetail = ({ navigation, route }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { item } = route.params;

  return (
    <View>
      <Modal animationType="slide" visible={modalOpen}>
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => setModalOpen(false)}
            style={{ alignSelf: "flex-end" }}
          >
            <AntDesign name="close" size={30} color="teal" />
          </TouchableOpacity>

          <View style={{ alignItems: "center", marginTop: 40 }}>
            <QRCode content={item.id} />
            <Text style={[styles.merchantName, { marginTop: 40 }]}>
              {item.name}
            </Text>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.merchantName}>{item.name}</Text>
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <AntDesign name="qrcode" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MerchantDetail;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 20,
  },
  merchantName: {
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: "bold",
  },
});
