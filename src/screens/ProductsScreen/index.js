import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {apiUrl, getRequest} from 'tallerNative/src/shared/constants';

import {Navbar, Search} from 'tallerNative/src/components';
import {StyleSheet} from 'react-native';
import baseStyles from 'tallerNative/src/styles/baseStyles';

export default class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: '',
      products: [],
      searchQuery: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    let department = this.props.route.params.department;
    this.setState({department: department});
    if (!department) {
      this.setState({searchQuery: this.props.route.params.search});
      let url = `${apiUrl}/products/?productdescription_like=${this.props.route.params.search}`;
      fetch(url, getRequest)
        .then(response => response.json())
        .then(response => this.setState({products: response}));
    } else {
      department =
        department.charAt(0).toUpperCase() + department.slice(1).toLowerCase();
      let url = department
        ? `${apiUrl}/products/?department=${department}`
        : `${apiUrl}/products`;
      fetch(url, getRequest)
        .then(response => response.json())
        .then(response => this.setState({products: response}));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevProps.route.params.department !== this.props.route.params.department
    ) {
      let department = this.props.route.params.department;
      this.setState({department: department});
      if (prevState.searchQuery !== this.state.searchQuery) {
        this.setState({searchQuery: this.props.route.params.search});
        let url = `${apiUrl}/products/?productdescription_like=${this.props.route.params.search}`;
        fetch(url, getRequest)
          .then(response => response.json())
          .then(response => this.setState({products: response}));
      } else {
        department =
          department.charAt(0).toUpperCase() +
          department.slice(1).toLowerCase();
        let url = department
          ? `${apiUrl}/products/?department=${department}`
          : `${apiUrl}/products`;
        fetch(url, getRequest)
          .then(response => response.json())
          .then(response => this.setState({products: response}));
      }
    }
  }

  handleSearch(search) {
    this.setState({searchQuery: search});
  }

  renderItem({item}) {
    return <Item item={item} navigation={this.props.navigation} />;
  }

  render() {
    return (
      <View style={[baseStyles.container, {width: '100%'}]}>
        <Navbar navigation={this.props.navigation} />
        <Search
          onSearch={this.handleSearch}
          navigation={this.props.navigation}
        />
        <FlatList
          style={{
            width: '100%',
            backgroundColor: '#eaeaea',
            padding: 5,
            flex: 1,
          }}
          data={this.state.products}
          //renderItem={this.renderItem}
          renderItem={({item}) => (
            <Item item={item} navigation={this.props.navigation} />
          )}
          extraData={this.props}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const Item = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Product', {item: item})}>
      <View style={homeStyles.item}>
        <Image style={homeStyles.itemImage} source={{uri: item.image}} />
        <View style={homeStyles.itemDescriptionContainer}>
          <Text style={homeStyles.itemDescription}>{item.productname}</Text>
          <Text style={homeStyles.itemDescription}>
            {item.productdescription}
          </Text>
          <View style={homeStyles.priceContainer}>
            <Text style={[homeStyles.itemDescription, homeStyles.price]}>
              {`${item.price.toString()} €`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const homeStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#036564',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  itemImage: {
    backgroundColor: 'white',
    padding: 3,
    flex: 2,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  itemDescriptionContainer: {
    flex: 8,
  },
  itemDescription: {
    color: 'white',
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
  },
});
