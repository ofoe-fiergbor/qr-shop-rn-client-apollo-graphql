import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import {useQuery} from '@apollo/client'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
  } from "react-native";
import { Ionicons } from "@expo/vector-icons";


import { logout,userMerchants } from '../redux/action'
import {FETCH_ALL_MERCHANTS} from '../graphql/merchant'


const Profile = ({navigation, logout, userMerchants, auth:{user}}) => {

    const {data, loading} = useQuery(FETCH_ALL_MERCHANTS)

    const userMerchantData =
    user &&
    data &&
    data.getMerchants.filter((item) => item.email === user.email);
  useEffect(() => {
    // console.log(merchantData)
    userMerchants(userMerchantData);
  }, [data, user]);
    const {
        container,
        innerProfileContainer,
        profileImage,
        profileDetailSections,
        detailText,
        profileButtons,
        profileButtonText,
      } = style;
    
    return (
        <View style={container}>
        {user && (
          <View style={innerProfileContainer}>
            <Image
              source={require("../component/assets/jenny.jpg")}
              style={profileImage}
            />
  
            <View style={{ marginTop: 30, width: "100%", alignItems: "center" }}>
              <View style={profileDetailSections}>
                <Ionicons name="md-person" size={24} color="black" />
                <Text style={detailText}>{user.username}</Text>
              </View>
              <View style={profileDetailSections}>
                <Ionicons name="md-mail" size={24} color="black" />
                <Text style={detailText}>{user.email}</Text>
              </View>
              {loading && <ActivityIndicator size="large" color="teal" />}
              {data && (
                <TouchableOpacity
                  style={profileButtons}
                  onPress={() => navigation.navigate("merchants")}
                >
                  <Text style={profileButtonText}>
                    Merchants ({userMerchantData.length})
                  </Text>
                </TouchableOpacity>
              )}
  
              <TouchableOpacity
                style={[profileButtons, { backgroundColor: "red" }]}
                onPress={() => logout()}
              >
                <Text style={profileButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
}

function mstp(state) {
    return {
      auth: state.auth,
    };
  }

export default connect(mstp, {logout, userMerchants})(Profile)


const style = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      paddingTop: 30,
    },
    innerProfileContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
      width: "100%",
    },
    profileImage: {
      width: 180,
      height: 200,
      alignSelf: "center",
      borderRadius: 20,
    },
    profileDetailSections: {
      borderBottomWidth: 1,
      borderBottomColor: "grey",
      width: "65%",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      // marginBottom: 15
    },
    detailText: {
      fontSize: 18,
      padding: 10,
    },
    profileButtons: {
      width: "65%",
      backgroundColor: "teal",
      height: 50,
      marginTop: 20,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    profileButtonText: {
      fontWeight: "bold",
      color: "#fff",
      fontSize: 18,
    },
  
    // testButn: {
    //   width: 200,
    //   height: 50,
    //   backgroundColor: "teal",
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
  });
  