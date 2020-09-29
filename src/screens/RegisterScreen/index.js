import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';

import {HR} from 'tallerNative/src/components';
import {StyleSheet} from 'react-native';
import baseStyles from 'tallerNative/src/styles/baseStyles';

export default class RegisterScreen extends Component {
  render() {
    return (
      <View style={[baseStyles.container]}>
        <Text style={[registerStyles.header]}> Registro </Text>
        <View style={[registerStyles.formContainer]}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            style={[registerStyles.input]}></TextInput>
          <HR />
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            style={[registerStyles.input]}></TextInput>
          <HR />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            style={[registerStyles.input]}></TextInput>
          <HR />
          <TouchableOpacity style={registerStyles.button} onPress={() => {}}>
            <Text style={registerStyles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <View style={registerStyles.goToLogin}>
            <Text>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity style={registerStyles.button} onPress={() => {}}>
              <Text style={registerStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const registerStyles = StyleSheet.create({
  header: {
    textAlign: 'left',
    color: '#033649',
    fontSize: 25,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: '#eaeaea',
    width: '100%',
    paddingTop: '5%',
    paddingBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#036564',
    color: 'white',
    width: '90%',
  },
  button: {
    backgroundColor: '#033649',
    padding: 10,
    width: '90%',
    textAlign: 'center',
  },
  goToLogin: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
  },
});
