import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as AuthActions from '../store/actions/Auth';

const LogoutScreen = (props) => {

  const dispatch = useDispatch();


  useEffect(() => {
     dispatch(AuthActions.logout)
     const Logout = async() => {
      const userData = await AsyncStorage.setItem('userData', JSON.stringify({
        token: null
      }));
    }
    Logout();
    props.navigation.navigate('Auth');
  }, [dispatch])

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size='large' color={Colors.primary}/>
    </View>
  )
}

export default LogoutScreen
