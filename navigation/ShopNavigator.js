import React from 'react';
import {SafeAreaView, Text, View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import {NavigationContainer} from '@react-navigation/native';
import  Colors  from '../constants/Colors';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const ProductsNavigator = () => {
  return (
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
       <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ 
          // title: 'Products Details', 
          headerStyle:{
            backgroundColor:Colors.primary,
          },
          headerTintColor: 'white',
           }}>
       </Stack.Screen>
     </Stack.Navigator>
  ) 
}

export const OrdersNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ 
          title: 'Orders', 
          headerStyle:{
            backgroundColor:Colors.primary,
          },
          headerTintColor: 'white',
           }}>
       </Stack.Screen>
      </Stack.Navigator>
  )
}


export const AuthNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ 
          title: 'Login or Sign Up', 
          headerStyle:{
            backgroundColor:Colors.primary,
          },
          headerLeft: () => null,
          headerTintColor: 'white',
           }}>
       </Stack.Screen>
      </Stack.Navigator>
  )
}

export const UserProductsNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={{ 
          title: 'User Products', 
          headerStyle:{
            backgroundColor:Colors.primary,
          },
          headerTintColor: 'white',
           }}>
       </Stack.Screen>
        <Stack.Screen
        name="EditProduct"
        component={EditProductsScreen}
        options={{ 
          title: 'Edit Product', 
          headerStyle:{
            backgroundColor:Colors.primary,
          },
          headerTintColor: 'white',
           }}>
       </Stack.Screen>
    </Stack.Navigator>
  )
}

export const ShopNavigator = () => {
  return( 
    <Drawer.Navigator initialRouteName="Products">
      <Drawer.Screen name="Products" component={ProductsNavigator}/>
      <Drawer.Screen name="Orders" component={OrdersNavigator} />
      <Drawer.Screen name="UserProducts" component={UserProductsNavigator} />
      <Drawer.Screen name="Logout" component={LogoutScreen}/>
    </Drawer.Navigator>
  )
 
}

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions = {{
        headerShown:false
      }}
      >
          <Stack.Screen name="StartUp" component={StartupScreen} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="shop" component={ShopNavigator} />
      </Stack.Navigator>
   </NavigationContainer>
  )
}