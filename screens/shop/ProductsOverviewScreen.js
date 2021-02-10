import React, {useEffect} from 'react';
import {Text, FlatList, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/ui/HeaderButton';

const ProductsOverviewScreen = (props) =>{
   const products = useSelector(state=>state.products.availableProducts);
   const dispatch = useDispatch();

   useEffect(() => {
    props.navigation.setOptions({
      title: 'Hello',
      headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Cart' iconName='md-cart'/>
      </HeaderButtons>
    });
  }, [props.navigation]);

  return(
     <FlatList 
     data={products} 
     renderItem={itemData=><ProductItem 
      item={itemData}
      onViewDetails={()=>{
        props.navigation.navigate({name:"ProductDetails", params:{
          productId:itemData.item.id,
          productTitle: itemData.item.title,
        }});
      }}
      onAddToCart={()=>{dispatch(cartActions.addToCart(itemData.item))}}
      />
    }/>
  )

}


export default ProductsOverviewScreen;