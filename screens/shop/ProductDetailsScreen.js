import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';


const ProductDetailsScreen = (props) => {
 
  const productId = props.route.params.productId;
  const title = props.route.params.productTitle;
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));

  useEffect(() => {
    props.navigation.setOptions({
      title: title,
    });
  }, [props.navigation]);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
      <View style={styles.actions}>
      <Button color={Colors.primary} title='Add To Cart' onPress={()=>{dispatch(cartActions.addToCart(selectedProduct))}}/>
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  image:{
    width:'100%',
    height:300
  },
  actions:{
    marginVertical:10,
    alignItems:'center',
  },
  price:{
    fontSize:20,
    color:'#888',
    textAlign:'center',
    marginVertical:20,
  },
  description:{
    fontSize:14,
    textAlign:'center',
    marginHorizontal:20,
  }
})

export default ProductDetailsScreen