import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image
} from "react-native";
import { QRCode } from "react-native-custom-qr-codes-expo";
import { AntDesign } from "@expo/vector-icons";

const MerchantDetail = ({ navigation, route }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { item } = route.params;
  const { items } = item;

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

      <FlatList
        data={items}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.merchantName}>{item.name}</Text>
            <TouchableOpacity onPress={() => setModalOpen(true)}>
              <AntDesign name="qrcode" size={30} color="black" />
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
                  <Image style={styles.itemImage} source={require("../component/assets/matthew.png")} />
                  <View style={{justifyContent:'center'}}>
                    <Text style={styles.name}>{item.itemName}</Text>
                    <Text style={styles.price}>GHC {item.price}</Text>
                  </View>
                </View>
          )
        }}
      />
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
  itemContainer:{
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    marginVertical: 10,
    flexDirection:'row'
  
  },
  itemImage:{
    height:100,
    width:120,
    marginRight: 10
  },
  name:{
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight:'bold',
    width: 180,
    
  },
  price:{
    fontWeight:'bold',
    color:'grey'
  },
  merchantName:{
    textAlign:'center',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform:'uppercase',
    marginBottom: 20,
    marginTop: 10
  }

});
