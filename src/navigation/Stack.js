import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../sreens/Home";
import Welcome from "../sreens/Welcome";
import Login from "../sreens/Login";
import Register from "../sreens/Register";
import Scanner from "../sreens/Scanner";
import Merchants from "../sreens/Merchants";
import Details from "../sreens/MerchantDetail";
import Profile from "../sreens/Profile";
import Result from "../sreens/Result";
import Checkout from "../sreens/Checkout";

const Stack = createStackNavigator();

const Root = ({ isLoggedIn }) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerTitle: "Profile", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="merchants"
            component={Merchants}
            options={{ headerTitle: "Merchants", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="details"
            component={Details}
            options={{
              headerTitle: "Merchant Menu",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="scanner"
            component={Scanner}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="result"
            component={Result}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="checkout"
            component={Checkout}
            options={{ headerTitle: "Checkout", headerTitleAlign: "center" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="register"
            component={Register}
          />
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
