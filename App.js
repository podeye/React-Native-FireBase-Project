import React, {useState} from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import {ShopNavigator} from './navigation/ShopNavigator'
import {View, Text} from 'react-native';
import cartReducer from './store/reducers/cart';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {  
  return Font.loadAsync({
    'a': require('./assets/fonts/OpenSans-Regular.ttf'),
    'b': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  return (
    <Provider store={store}>
     <ShopNavigator/>
    </Provider>
  );
}

