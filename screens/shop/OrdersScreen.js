import React, {useEffect, useState} from 'react';
import {FlatList, Button, View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order'

const OrdersScreen = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  
  
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: 'Orders',
      headerLeft: ()=>(
        <View>
           <View style={styles.cartHeaderButtonContainer}>
          <Button title='Menu' 
            style={styles.cartHeaderButton}
            color={Colors.primary}
            onPress={()=> props.navigation.toggleDrawer()}/>
        </View>
        </View>
      ),
     
  })}, [props.navigation]);


  const orders = useSelector(state => state.Order.orders)
  const dispatch = useDispatch();
  // console.log('ORDERS',orders);

  useEffect(()=>{
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(()=>{
      setIsLoading(false);
    });
 
  }, [dispatch])

  // const orders = [
  //   {id:1,
  //   size:'s'},
  //   {id:2,
  //   size:'m'},
  //   {id:3,
  //   size:'L'},
  // ]

  if(isLoading){
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size='large' color={Colors.primary}/>
      <Text>Hello</Text>
    </View>
  }

  if(orders.length === 0 ){
    return <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>No orders to list</Text>
    </View>
  }

  return (
    <FlatList 
    data={orders} 
    keyExtractor = {item=>item.id}
    renderItem={itemData => <View>
      <OrderItem item = {itemData}>G</OrderItem>
    </View>} />
  )
}


const styles = StyleSheet.create({
  cartHeaderButtonContainer:{
    overflow:'hidden',
    marginHorizontal:5,
  },
})


export default OrdersScreen
