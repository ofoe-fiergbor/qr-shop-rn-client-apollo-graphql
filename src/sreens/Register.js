import React, { useState } from "react";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { REGISTER_NEW_USER } from "../graphql/register";
import { login } from "../redux/action";

const Register = ({ navigation, login }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { error, loading }] = useMutation(REGISTER_NEW_USER, {
    variables: values,
    update(proxy, result) {
      console.log(result);
      login(result.data.register);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser();
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
        Register
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
            placeholder="Username..."
            value={values.username}
            keyboardType="default"
            onChangeText={(text) => onChange("username", text)}
            style={style.formInput}
          />
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
          <TextInput
            placeholder="Confirm password..."
            value={values.confirmPassword}
            secureTextEntry={true}
            keyboardType="default"
            onChangeText={(text) => onChange("confirmPassword", text)}
            style={style.formInput}
          />
        </View>

        <TouchableOpacity style={style.registerButton} onPress={onSubmit}>
          <Text style={style.registerButtonText}>Register</Text>
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
          <Text>Already have an account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("login")}
          >
            <Text style={{ color: "navy", fontWeight: "bold" }}>Login</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default connect(null, { login })(Register);

const style = StyleSheet.create({
  container: {
    flex: 1,
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
