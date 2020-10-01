import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {
  usernameValidation,
  passwordValidation,
} from 'tallerNative/src/shared/validators';
import {apiUrl, getRequest} from 'tallerNative/src/shared/constants';

import {HR} from 'tallerNative/src/components';
import {StyleSheet} from 'react-native';
import baseStyles from 'tallerNative/src/styles/baseStyles';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.redirectToRegister = this.redirectToRegister.bind(this);
    this.submitLoginHandler = this.submitLoginHandler.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <View style={[baseStyles.container]}>
        <Text style={[loginStyles.header]}> Login </Text>
        <View style={[loginStyles.formContainer]}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            style={[loginStyles.input]}
            onChangeText={username =>
              this.setState({username: username})
            }></TextInput>
          <HR />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            style={[loginStyles.input]}
            onChangeText={password =>
              this.setState({password: password})
            }></TextInput>
          <HR />
          <TouchableOpacity
            style={loginStyles.button}
            onPress={() => this.submitLoginHandler()}>
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={loginStyles.goToLogin}>
            <Text>¿Necesitas una cuenta?</Text>
            <TouchableOpacity
              style={loginStyles.button}
              onPress={() => this.redirectToRegister()}>
              <Text style={loginStyles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  redirectToRegister() {
    this.props.navigation.navigate('Register');
  }

  login(username) {
    // dispatch(loggedIn(username));
    // history.push('/home');
    this.props.navigation.navigate('Home');
  }

  submitLoginHandler() {
    const isValidUsername = usernameValidation('username', this.state.username);
    const isValidPasswword = passwordValidation(
      'password',
      this.state.password,
    );
    let username = this.state.username;
    let password = this.state.password;
    if (!isValidUsername && !isValidPasswword) {
      fetch(`${apiUrl}/users/?username=${this.state.username}`, getRequest)
        .then(response => response.json())
        .then(response => {
          if (
            response[0] &&
            response[0].username === username &&
            response[0].password === password
          ) {
            this.login(username);
          } else {
            alert('Usuario o contraseña incorrectos');
          }
        });
    } else {
      alert('El usuario o la contraseña no cumplen los requisitos');
    }
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
