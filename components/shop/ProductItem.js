import React from 'react';
import {View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native'; 
import Colors from '../../constants/Colors';


const ProductItem = (props) => {

  const {item: {item}} = props; 
  

  return (
    <TouchableOpacity onPress={props.onViewDetails}>
    <View style = {styles.product} >
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={{uri:item.imageUrl}}/>
      </View>
      <View style={styles.details}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      </View>
        <View style={styles.actions}>
          <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails}/>
          <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart}/>
        </View>
    </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  product:{
    elevation: 5,
    borderRadius:10,
    backgroundColor:'white',
    height:300,
    margin:20
  },
  image:{
    width:'100%',
    height:'100%',
  },
  title:{
    fontSize:18,
    marginVertical:4,
  },
  price:{
    fontSize:14,
    color:'#888',
  },
  actions:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:'25%',
    paddingHorizontal:15,
  },
  details:{
    alignItems:'center',
    height:'15%',
  },
  imgContainer:{
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden',
    height:'60%',
  }
});

export default ProductItem;
