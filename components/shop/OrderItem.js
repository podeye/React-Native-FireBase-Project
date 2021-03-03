import React, {useState} from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = (props) => {

  const [showDetails, setShowDetails] = useState(false);
  const {totalAmount, readableDate} = props.item.item;
  // console.log("MAP OBJECTS",props.item);
  //props.item.item.items.map(item=><Text>{item.sum}</Text>)

  //  console.log('PROPS', props.item.item.items);

  return (
   <View style={styles.orderItem}>
     <View style={styles.summery}>
       <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
       <Text style={styles.date}>{readableDate}</Text>
     </View>
     <Button color={Colors.primary} title={!showDetails ? 'Show Details' : 'Hide Details'} onPress={()=>{
       setShowDetails(prevState=>!prevState);

     }}/>
     {showDetails && 
     <View style = {styles.container}>
        {props.item.item.items.map(item=>
        <View style={styles.rowContainer}>
          <Text>Product: {item.productTitle}</Text>
          <Text>Price: ${item.productPrice}</Text>
          <Text>Quantity: {item.quantity}</Text>
        </View>
        )
        }
       
      </View>}
  </View>
  )
      }


const styles = StyleSheet.create({
  orderItem:{
    elevation:5,
    borderRadius:10,
    backgroundColor:'white',
    margin:20,
    padding:10,
  },
  summery:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width: '100%',
    marginBottom:5,
  },
  totalAmount:{
    fontWeight:'bold',
    fontSize:16,
  },
  date:{
    fontSize:16,
    color:'#888',
  },
  container:{
    margin: 5,
  },
  rowContainer:{
    marginVertical:5,
  }
})

export default OrderItem
