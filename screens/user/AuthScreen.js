import React, {useState,useReducer, useCallback, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/Auth';


import Input from '../../components/ui/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if(action.type === FORM_INPUT_UPDATE){
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input] : action.isValid
    }
    let updatedFormIsValid = true;
    for(const key in updatedValidities){
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
  
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    }
  }
}
const AuthScreen = (props) => {

  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  
const [formState, dispatchFormState] = useReducer(formReducer, 
  {
    inputValues:{
      email:'',
      password:''
    },
    inputValidities:{
      email:false,
      password: false
    },
    formIsValid: false
  })

  useEffect(() => {
    if(error){
      Alert.alert('An error occured!', error, [{text:'ok'}] )
    }
   
  }, [error])

  const authHandler = async() =>{
    let action;
    if(isSignup){
      action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
    }else{
      action = authActions.login(formState.inputValues.email, formState.inputValues.password)
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
      props.navigation.navigate({name:'shop'});
      setIsLoading(false);
    } catch (error) {
      setError(error.message)
      setIsLoading(false);
    }
  }

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => { 
    dispatchFormState(
      {
        type: FORM_INPUT_UPDATE,
        value: inputValue, 
        isValid: inputValidity,
        input: inputIdentifier
      })
  },[dispatchFormState])
  return (
    <KeyboardAvoidingView
    // keyboardVerticalOffset={50}
    // behavior='height'
    style={styles.screen}>
      <View style={styles.authContainer}>
        <Input 
        id="email"
        label='Email'
        keyboardType="email-address"
        required
        email
        autoCapitalize="none"
        errorText="Please enter a valid email address"
        onInputChange={inputChangeHandler}
        initialValue
        />
          <Input 
        id="password"
        label='Password'
        keyboardType="default"
        secureTextEntry
        required
        minLength={5} 
        autoCapitalize="none"
        errorText="Please enter a valid password"
        onInputChange={inputChangeHandler}
        initialValue
        />
        {isLoading?<ActivityIndicator size='large' color={Colors.primary}/>:(
        <Button 
        title={isSignup ? 'Sign Up' : 'Login'}
        color={Colors.primary}
        onPress={authHandler}/>
        )}
        
        <Button title={`Switch to ${isSignup?'Login':'Sign Up'}`}
        color={Colors.accent}
        onPress={()=>{setIsSignup(prevState => !prevState)}}/>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  authContainer:{
    width:'80%',
    maxWidth: 400,
    height: '50%',
    maxHeight:400
  }
})

export default AuthScreen
