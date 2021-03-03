import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const CartItem = (props) => {

  const {quantity, productTitle, sum} = props.itemData;

  return (
    <View style={styles.cartItem}>
      <View style ={styles.itemData}>
        <Text style ={styles.itemquantity}>{quantity}</Text>
        <Text style ={styles.mainText}>{productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{sum}</Text>
        <Button style={styles.deleteButton} title='Delete' onPress = {props.onRemove} color='red'/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem:{
    padding:10,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:10,
    marginVertical:10,
  },
  itemData:{
    flexDirection:'row',
    alignItems:'center',
  },
  itemquantity:{
    color:'#888',
    fontSize:16
  },
  mainText:{
    fontWeight:'bold',
    fontSize:16,
    marginHorizontal:5,
  },
  deleteButton:{
    marginLeft:20,
  },

})

export default CartItem
