import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import {StyleSheet} from 'react-native';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={navbarStyles.navbar}>
        <Text
          onPress={this.props.navigation.navigate('Home')}
          style={navbarStyles.logo}>
          Ecom
        </Text>
        <TouchableOpacity onPress={() => {}} style={navbarStyles.profile}>
          <Icon name="shopping-cart" type="font-awesome" color="#033649" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={navbarStyles.profile}>
          <Icon name="person" type="material" color="#033649" />
        </TouchableOpacity>
      </View>
    );
  }
}

const navbarStyles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginVertical: 3,
  },
  logo: {
    marginLeft: 5,
    textAlign: 'left',
    flex: 6,
    color: '#033649',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
  },
});
