import React, {useState} from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import {MainNavigator} from './navigation/ShopNavigator'
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';
import authReducer from './store/reducers/Auth';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  Order: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
     <MainNavigator/>
    </Provider>
  );
}

