import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';

import {
  usernameValidation,
  passwordValidation,
  emailValidation,
} from 'tallerNative/src/shared/validators';
import {apiUrl, postRequest} from 'tallerNative/src/shared/constants';
import {HR} from 'tallerNative/src/components';
import {StyleSheet} from 'react-native';
import baseStyles from 'tallerNative/src/styles/baseStyles';

export default class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.submitRegisterHandler = this.submitRegisterHandler.bind(this);
  }
  render() {
    return (
      <View style={[baseStyles.container]}>
        <Text style={[registerStyles.header]}> Registro </Text>
        <View style={[registerStyles.formContainer]}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            style={[registerStyles.input]}
            onChangeText={username =>
              this.setState({username: username})
            }></TextInput>
          <HR />
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            style={[registerStyles.input]}
            onChangeText={email => this.setState({email: email})}></TextInput>
          <HR />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            style={[registerStyles.input]}
            onChangeText={password =>
              this.setState({password: password})
            }></TextInput>
          <HR />
          <TouchableOpacity
            style={registerStyles.button}
            onPress={() => this.submitRegisterHandler()}>
            <Text style={registerStyles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <View style={registerStyles.goToLogin}>
            <Text>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity
              style={registerStyles.button}
              onPress={() => this.redirectToLogin()}>
              <Text style={registerStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  redirectToLogin() {
    this.props.navigation.navigate('Login');
  }

  submitRegisterHandler() {
    const isValidUsername = usernameValidation('username', this.state.username);
    const isValidPasswword = passwordValidation(
      'password',
      this.state.password,
    );
    const isValidEmail = emailValidation('email', this.state.email);
    if (!isValidEmail && !isValidUsername && !isValidPasswword) {
      const body = JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      });
      fetch(`${apiUrl}/users`, {
        ...postRequest,
        body: body,
      }).then(response => {
        if (response.status === 201) {
          alert('Usuario añadido!');
        }
        this.redirectToLogin();
      });
    } else {
      alert('El usuario, el email o la contraseña no cumplen los requisitos');
    }
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
