import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {apiUrl, getRequest} from 'tallerNative/src/shared/constants';

import {StyleSheet} from 'react-native';
import baseStyles from 'tallerNative/src/styles/baseStyles';

export default class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      quantity: 1,
      avatars: [
        'https://www.w3schools.com/howto/img_avatar2.png',
        'https://www.w3schools.com/howto/img_avatar.png',
        'https://www.w3schools.com/w3images/avatar2.png',
      ],
    };
  }

  componentDidMount() {
    let productId = this.props.route.params.productId;
    const urlProduct = `${apiUrl}/products/${productId}`;
    const urlDeal = `${apiUrl}/deals/${productId}`;
    fetch(urlDeal, getRequest)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          fetch(urlProduct, getRequest)
            .then(response => response.json())
            .then(response => this.setState({product: response}));
        }
      })
      .then(response => this.setState({product: response}));
  }

  addOneUnity() {
    this.setState({quantity: this.state.quantity + 1});
  }

  substractOneUnity() {
    let newQuantity = this.state.quantity > 1 ? this.state.quantity - 1 : 1;
    this.setState({quantity: newQuantity});
  }

  priceWithoutIVA(price) {
    return (price / 1.21).toFixed(2);
  }

  render() {
    return (
      <View style={productStyles.item}>
        <Image
          style={productStyles.itemImage}
          source={{uri: this.props.route.params.item.image}}
        />
        <View style={productStyles.itemDescriptionContainer}>
          <Text style={[productStyles.title, productStyles.itemDescription]}>
            {this.props.route.params.item.productname}
          </Text>
          <Text style={[productStyles.text, productStyles.itemDescription]}>
            {this.props.route.params.item.productdescription}
          </Text>
          <View style={productStyles.priceContainer}>
            <Text style={[productStyles.itemDescription, productStyles.price]}>
              {`${this.props.route.params.item.price.toString()} €`}
            </Text>
          </View>
        </View>
        <View style={{flex: 2, padding: 10}}>
          <View style={productStyles.quantityButtonsContainer}>
            <TouchableOpacity
              style={productStyles.quantityButtons}
              onPress={() => this.substractOneUnity()}>
              <Icon name="remove" type="material" color="white" />
            </TouchableOpacity>
            <Text style={productStyles.quantityText}>
              {this.state.quantity.toString()}
            </Text>
            <TouchableOpacity
              style={productStyles.quantityButtons}
              onPress={() => this.addOneUnity()}>
              <Icon name="add" type="material" color="white" />
            </TouchableOpacity>
          </View>
          <View style={productStyles.buyButtonsContainer}>
            <TouchableOpacity style={productStyles.buyButtons}>
              <Text style={productStyles.buyText}>Añadir al carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={productStyles.buyButtons}>
              <Text style={productStyles.buyText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const productStyles = StyleSheet.create({
  item: {
    flex: 1,
    width: '90%',
    backgroundColor: '#e6e6e6',
    marginVertical: 8,
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  itemImage: {
    backgroundColor: 'white',
    padding: 3,
    flex: 4,
  },
  itemDescriptionContainer: {
    flex: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
  itemDescription: {
    color: 'black',
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  quantityButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButtons: {
    flex: 1,
    backgroundColor: '#036564',
    padding: 7,
  },
  quantityText: {
    flex: 1,
    color: '#036564',
    textAlign: 'center',
    fontSize: 20,
    borderTopColor: '#036564',
    borderBottomColor: '#036564',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 2,
    paddingBottom: 6,
  },
  buyButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtons: {
    flex: 1,
    marginHorizontal: 20,
    height: 30,
  },
  buyText: {
    backgroundColor: '#036564',
    textAlign: 'center',
    padding: 8,
    color: 'white',
  },
});
