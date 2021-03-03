import React, {useEffect, useState, useCallback} from 'react';
import {Text, FlatList, Button, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors  from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const ProductsOverviewScreen = (props) =>{

   const [isLoading, setIsLoading] = useState(false);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [err, setErr] = useState();

   const products = useSelector(state=>state.products.availableProducts);
   const dispatch = useDispatch();


   const loadProducts = useCallback(async() => {
     setIsRefreshing(true)
    setErr(null);
    try {
       await dispatch(productsActions.fetchProducts())
    } catch (error) {
      setErr(error.message)
    }
    setIsRefreshing(false)
  },[dispatch])

   React.useLayoutEffect(() => {
    setIsLoading(true);
    loadProducts().then(()=>{
      setIsLoading(false);
    })
 
    props.navigation.setOptions({
      title: 'All Products',
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
      headerRight: () => (
        <View style={styles.cartHeaderButtonContainer}>
          <Button title='Cart' 
            style={styles.cartHeaderButton}
            color={Colors.primary}
            onPress={()=> props.navigation.navigate({name:"Cart"})}/>
        </View>
      )
      
    });
  }, [dispatch,loadProducts,props.navigation]);

  const selectItemHandler = (id, title) =>{
    props.navigation.navigate({name:"ProductDetails", params:{
      productId:id,
      productTitle:title
  }})
}

  if(err){
    return <View style={styles.centered}>
      <Text>An Error has occured</Text>
      <Button title='Try Again' onPress={loadProducts} color={Colors.primary}/>
    </View>
  }

  if(isLoading){
    return <View style={styles.centered}>
      <ActivityIndicator size='large' color = {Colors.primary}/>
    </View>
  }

  if(!isLoading && products.length === 0){
    return <View style={styles.centered}>
      <Text>No products found. Start adding some!</Text>
    </View>
  }

  return(
     <FlatList 
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products} 
      renderItem={itemData=><ProductItem 
      item={itemData}
      onSelect={()=>{selectItemHandler(itemData.item.id, itemData.item.title)}}>          
      <Button 
      color={Colors.primary} 
      title="View Details" 
      onPress={()=>{selectItemHandler(itemData.item.id, itemData.item.title)}}/>

      <Button 
      color={Colors.primary} 
      title="To Cart" 
      onPress={()=> {
        dispatch(cartActions.addToCart(itemData.item))
        }}/>
      </ProductItem>
    }/>
  )

}

const styles = StyleSheet.create({
  cartHeaderButtonContainer:{
    overflow:'hidden',
    marginHorizontal:5,
  },
  cartHeaderButton:{
  }, 
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})


export default ProductsOverviewScreen;