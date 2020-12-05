import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useMutation } from "@apollo/client";

import { login } from "../redux/action";
import { connect } from "react-redux";

import { LOGIN_WITH_EMAIL_AND_PASSWORD } from "../graphql/login";

const Login = ({ navigation, login }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [loginUser, { loading, error }] = useMutation(
    LOGIN_WITH_EMAIL_AND_PASSWORD,
    {
      update(proxy, result) {
        login(result.data.login);
      },
      variables: values,
      onError(error) {
        // console.log(JSON.stringify(error, null, 2));
        setErrors(error.graphQLErrors[0].extensions.errors);
      },
    }
  );

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    loginUser();
  };

  return (
    <View style={style.container}>
      <Image
        source={require("../component/assets/david-dvoracek-QiPe0UpC0_U-unsplash.jpg")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />

      <Text
        style={{
          marginBottom: 40,
          fontSize: 40,
          color: "#fff",
        }}
      >
        Login
      </Text>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: "#FFFFFF",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
        }}
      >
        <View>
          <TextInput
            placeholder="Email..."
            value={values.email}
            keyboardType="email-address"
            onChangeText={(text) => onChange("email", text)}
            style={style.formInput}
          />
          <TextInput
            placeholder="Password..."
            secureTextEntry={true}
            value={values.password}
            keyboardType="default"
            onChangeText={(text) => onChange("password", text)}
            style={style.formInput}
          />
        </View>

        <TouchableOpacity style={style.registerButton} onPress={onSubmit}>
          <Text style={style.registerButtonText}>Login</Text>
        </TouchableOpacity>

        {Object.keys(errors).length > 0 && (
          <View style={style.errContainer}>
            {Object.values(errors).map((err) => (
              <Text key={err} style={style.errText}>
                {err}
              </Text>
            ))}
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: "65%",
            justifyContent: "space-between",
          }}
        >
          <Text>Don't have an account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("register")}
          >
            <Text style={{ color: "navy", fontWeight: "bold" }}>Register</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default connect(null, { login })(Login);

const style = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    width: 250,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10,
  },
  registerButton: {
    marginTop: 20,
    width: 200,
    backgroundColor: "teal",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  errContainer: {
    marginTop: 20,
    width: "60%",
  },
  errText: {
    marginVertical: 2,
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
  },
});
