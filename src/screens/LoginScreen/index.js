import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';

import {HR} from 'tallerNative/src/components';
import {StyleSheet} from 'react-native';
import baseStyles from 'tallerNative/src/styles/baseStyles';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={[baseStyles.container]}>
        <Text style={[loginStyles.header]}> Registro </Text>
        <View style={[loginStyles.formContainer]}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            style={[loginStyles.input]}></TextInput>
          <HR />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            style={[loginStyles.input]}></TextInput>
          <HR />
          <TouchableOpacity style={loginStyles.button} onPress={() => {}}>
            <Text style={loginStyles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <View style={loginStyles.goToLogin}>
            <Text>¿Necesitas?</Text>
            <TouchableOpacity style={loginStyles.button} onPress={() => {}}>
              <Text style={loginStyles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const loginStyles = StyleSheet.create({
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
