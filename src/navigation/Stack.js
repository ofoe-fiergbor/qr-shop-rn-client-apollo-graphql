import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../sreens/Home";
import Welcome from "../sreens/Welcome";
import Login from "../sreens/Login";
import Register from "../sreens/Register";
import Scanner from "../sreens/Scanner";
import Merchants from "../sreens/Merchants";
import Details from "../sreens/MerchantDetail";
import { connect } from "react-redux";
import Profile from "../sreens/Profile";
import Result from "../sreens/Result";

const Stack = createStackNavigator();

const Root = ({ isLoggedIn }) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} options={{headerShown:false}} />
          <Stack.Screen name="profile" component={Profile}  />
          <Stack.Screen name="merchants" component={Merchants}  />
          <Stack.Screen name="details" component={Details}  />
          <Stack.Screen name="scanner" component={Scanner} options={{headerShown:false}} />
          <Stack.Screen name="result" component={Result} options={{headerShown:false}} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
function mstp(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
}
export default connect(mstp)(Root);
