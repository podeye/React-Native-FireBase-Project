import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'

const CartScreen = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const cartTotalAmout = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
  const transformedCartItems = [];

    for(const key in state.cart.items){
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle, 
        productPrice: state.cart.items[key].productPrice, 
        quantity: state.cart.items[key].quantity, 
        sum: state.cart.items[key].sum, 
      })
    }
    // console.log(transformedCartItems);
    return transformedCartItems.sort((a,b)=> a.productId > b.productId ? 1: -1);
  });

  const sendOrderHandler = async() => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmout));
    
    setTimeout(()=>{
      setIsLoading(false);
    },1000)
    
  }

  return (
    <View style={styles.screen}>
        <View style={styles.summery}>
          <Text style={styles.summeryText}>Total: <Text style={styles.amount}>${cartTotalAmout.toFixed(2)}</Text></Text>
          {isLoading? <ActivityIndicator size='small' color={Colors.primary}/>:    <Button title='Order Now' disabled={cartItems.length === 0} onPress={sendOrderHandler}/>}
        </View>
        <FlatList data={cartItems} 
        keyExtractor={item=>item.productId}
        renderItem={itemData=>
        <CartItem itemData={itemData.item} onRemove={()=>dispatch(cartActions.removeFromCart(itemData.item.productId))}/>
      }
        />
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{
    margin: 20,

  },
  summery:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20,
    padding:10,
    elevation:5,
  },
  summeryText:{
    fontWeight:'bold',
  },
  amount:{
    color: Colors.primary,
  }
})

export default CartScreen
