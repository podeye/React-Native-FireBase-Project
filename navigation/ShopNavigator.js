import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import {NavigationContainer} from '@react-navigation/native';
import  Colors  from '../constants/Colors';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';

const Stack = createStackNavigator();

export const ShopNavigator = () => {
  return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
        name="ProductOverview"
        component={ProductsOverviewScreen}
        options={{ 
          title: 'All Products', 
          headerStyle:{
            backgroundColor:Colors.primary,
          },
          headerTintColor: 'white',
           }}>
       </Stack.Screen>
       <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ 
          // title: 'Products Details', 
          headerStyle:{
            backgroundColor:Colors.primary,
          },
          headerTintColor: 'white',
           }}>
       </Stack.Screen>
     </Stack.Navigator>
   </NavigationContainer>
  )
}