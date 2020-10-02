import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import {apiUrl, getRequest} from 'tallerNative/src/shared/constants';
import {StyleSheet} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      search: '',
    };
    this.departmentRedirect = this.departmentRedirect.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    fetch(`${apiUrl}/departments`, getRequest)
      .then(response => response.json())
      .then(response => this.setState({departments: response}));
  }

  departmentRedirect(department) {
    this.props.navigation.navigate('Products', {department: department});
  }

  search() {
    this.props.onSearch(this.state.search);
    this.props.navigation.navigate('Products', {search: this.state.search});
  }

  render() {
    return (
      <View style={searchStyles.searchContainer}>
        <View style={searchStyles.departmentButton}>
          <Menu>
            <MenuTrigger>
              <Icon name="menu" type="material" color="white" />
            </MenuTrigger>
            <MenuOptions customStyles={dropdownStyles}>
              {this.state.departments.map(department => (
                <MenuOption
                  key={department.id}
                  onSelect={() => this.departmentRedirect(department.name)}>
                  <Text style={searchStyles.departmentItem}>
                    {department.name}
                  </Text>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        </View>
        <View style={searchStyles.searchInputContainer}>
          <TextInput
            style={searchStyles.searchInput}
            placeholder="What product are you interested in?"
            placeholderTextColor="white"
            onChangeText={search =>
              this.setState({search: search})
            }></TextInput>
        </View>
        <View style={searchStyles.searchButton}>
          <TouchableOpacity onPress={() => this.search()}>
            <Icon name="search" type="material" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const searchStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginVertical: 3,
  },
  departmentButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    height: 38,
    flex: 1,
    backgroundColor: '#036564',
    borderRadius: 3,
  },
  searchInputContainer: {
    flex: 8,
    backgroundColor: '#036564',
    borderRadius: 3,
  },
  searchInput: {
    height: 38,
    color: 'white',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    height: 38,
    flex: 1,
    backgroundColor: '#036564',
    borderRadius: 3,
  },
  departmentItem: {
    padding: 2,
  },
});

const dropdownStyles = {
  optionsContainer: {
    backgroundColor: '#eaeaea',
  },
  optionText: {
    color: '#033649',
  },
};
