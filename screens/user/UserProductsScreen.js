import React from 'react';
import {FlatList, View, Text, Button, StyleSheet, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products'

const UserProductsScreen = (props) => {


  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: 'My Products',
      headerLeft: ()=>(
        <View>
           <View style={styles.headerButtonContainer}>
          <Button title='Menu' 
            color={Colors.primary}
            onPress={()=> props.navigation.toggleDrawer()}/>
        </View>
        </View>
      ),
      headerRight: ()=>(
        <View>
           <View style={styles.headerButtonContainer}>
          <Button title='Add' 
            color={Colors.primary}
            onPress={()=>
            props.navigation.navigate('EditProduct',{
              productId:false,
            })
            }/>
        </View>
        </View>
      ),
    });
  }, [props.navigation]);
  
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch();

  const editProductHandler = (id) =>{
    props.navigation.navigate({name:"EditProduct", params:{
      productId:id,
  }})
}

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you want to delete', 
    [{text: 'No', style:'default'},
    {text: 'Yes', style:'destructive', onPress: () => {
      dispatch(productsActions.deleteProduct(id))
    }}
    ])
  }

  if(userProducts.length === 0 ){
    return <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>No products to list</Text>
    </View>
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={itemData=><ProductItem 
        item={itemData}
        onSelect = {()=> { 
          editProductHandler(itemData.item.id)
          }}>          
        <Button 
        color={Colors.primary} 
        title="Edit" 
        onPress={()=>{
          editProductHandler(itemData.item.id)
        }}/>
  
        <Button 
        color={Colors.primary} 
        title="Delete" 
        onPress={()=>{
          deleteHandler(itemData.item.id)
        }}/>
        </ProductItem>
      }
      />
  )
}

const styles = StyleSheet.create({
  headerButtonContainer:{
    overflow:'hidden',
    marginHorizontal:5,
  },
})

export default UserProductsScreen
