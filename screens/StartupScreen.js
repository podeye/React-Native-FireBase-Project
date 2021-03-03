import React, {useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/Auth';


const StartupScreen = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    const tryLogin = async() => {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      if(!userData){
        console.log('USER DATA',userData)
        props.navigation.navigate({name: "Auth"});
        return;
      }
      const {token, userId, expiryDate} = transformedData;
 

      const expirationDate = new Date(expiryDate);

      if(expirationDate <= new Date || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }
      props.navigation.navigate('shop');
      dispatch(authActions.authenticate(userId, token))
    }
    tryLogin();
  }, [dispatch])

  return (
    <View style = {styles.screen}>
      <ActivityIndicator size = 'large' color={Colors.primary}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})

export default StartupScreen
