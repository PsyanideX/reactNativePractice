import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import Drawer from 'react-native-drawer';

import {StyleSheet} from 'react-native';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelOpen: false,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  /*togglePanel() {
    if (this.state.isPanelOpen) {
      this._drawer.close();
      this.setState({isPanelOpen: false});
    } else {
      this._drawer.open();
      this.setState({isPanelOpen: true});
    }
  }*/

  render() {
    return (
      <View style={navbarStyles.navbar}>
        <Drawer
          ref={ref => (this._drawer = ref)}
          type="static"
          tapToClose={true}
          styles={drawerStyles}
          side="right"
          content={<Text>HOLA</Text>}></Drawer>

        <Text
          onPress={this.props.navigation.navigate('Home')}
          style={navbarStyles.logo}>
          Ecom
        </Text>
        <TouchableOpacity onPress={() => {}} style={navbarStyles.profile}>
          <Icon name="shopping-cart" type="font-awesome" color="#033649" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.togglePanel()}
          style={navbarStyles.profile}>
          <Icon name="person" type="material" color="#033649" />
        </TouchableOpacity>
      </View>
    );
  }
}

const drawerStyles = {
  drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
};

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
