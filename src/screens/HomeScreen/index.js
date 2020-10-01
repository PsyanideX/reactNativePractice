import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  SectionList,
} from 'react-native';
import {apiUrl, getRequest} from 'tallerNative/src/shared/constants';

import {HR, Search} from 'tallerNative/src/components';
import {StyleSheet} from 'react-native';
import baseStyles from 'tallerNative/src/styles/baseStyles';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      deals: [],
      products: [],
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/deals?_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => this.setState({deals: response}));

    fetch(`${apiUrl}/products?_start=11&_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => this.setState({products: response}));
  }

  renderItem = ({item}) => {
    return <Item item={item} />;
  };
  render() {
    return (
      <View style={[baseStyles.container, {width: '100%'}]}>
        <Search onSearch={() => {}} navigation={this.props.navigation} />
        <SectionList
          style={{
            width: '100%',
            backgroundColor: '#eaeaea',
            padding: 5,
            flex: 1,
          }}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{title}</Text>
          )}
          sections={[
            {
              title: 'Nuestras ofertas del día',
              data: this.state.deals,
              renderItem: ({item, index, section: {title, data}}) =>
                this.renderItem({item}),
            },
            {
              title: 'Nuestros productos destacados',
              data: this.state.products,
              renderItem: ({item, index, section: {title, data}}) =>
                this.renderItem({item}),
            },
          ]}
          keyExtractor={(item, index) => item.id + index}
        />
      </View>
    );
  }
}

const Item = ({item}) => {
  return (
    <View style={homeStyles.item}>
      <Image style={homeStyles.itemImage} source={{uri: item.image}} />
      <View style={homeStyles.itemDescriptionContainer}>
        <Text style={homeStyles.itemDescription}>{item.productname}</Text>
        <Text style={homeStyles.itemDescription}>
          {item.productdescription}
        </Text>
        <View style={homeStyles.priceContainer}>
          {item.dealprice ? (
            <React.Fragment>
              <Text style={[homeStyles.itemDescription, homeStyles.oldPrice]}>
                {`${item.price.toString()} €`}
              </Text>
              <Text style={[homeStyles.itemDescription, homeStyles.price]}>
                {`${item.dealprice.toString()} €`}
              </Text>
            </React.Fragment>
          ) : (
            <Text style={[homeStyles.itemDescription, homeStyles.price]}>
              {`${item.price.toString()} €`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#036564',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
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
  oldPrice: {
    color: 'red',
    textDecorationLine: 'line-through',
  },
});
