import React, {useCallback, useReducer, useState} from 'react';
import {View, Text, StyleSheet, Button,
   TextInput, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import Colors from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import * as productActions from '../../store/actions/products';
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

const EditProductsScreen = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const productId = props.route.params.productId;
  let product = false;

  if(productId){
  product = useSelector(state => state.products.availableProducts.find(item=> item.id === productId));
  }
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, 
    {
      inputValues:{
        title: product ? product.title: '',
        imageUrl: product ? product.imageUrl: '',
        description: product ? product.description: '',
        price: ''
      },
      inputValidities:{
        title: product ? true:false,
        imageUrl: product ? true:false,
        description: product ? true:false,
        price: product ? true:false
      },
      formIsValid: product ? true:false
    })

    React.useEffect(() => {
      if(error){
        Alert.alert("An error occured", error, [{text: 'OK'}])
      }
    }, [error])

  const submitHandler = useCallback(async () => {
  if(!formState.formIsValid){
    Alert.alert('Wrong Input!', 'Please check the errors in the form.', [{text:'Ok'}])
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    
    if(product){
      await dispatch(productActions.updateProduct(
          productId, 
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl));
     }else{
      await dispatch(productActions.createProduct(
        formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price));
     }
     props.navigation.goBack();

  } catch (error) {
    setError(error.message)
  }
  setIsLoading(false);
},[dispatch, productId, formState]);
  

  React.useLayoutEffect(() => {
    // props.navigation.setParams({submit: submitHandler})
    // uncomment if problems with submitHandler
    // console.log('Important',props.route)
    props.navigation.setOptions({
      title: props.route.params.productId ? 'Edit Product' : 'Add Product',
      headerRight: ()=>(
        <View>
          <View style={styles.cartHeaderButtonContainer}>
        <Button title='Save' 
          style={styles.menuHeaderButton}
          color={Colors.primary}
          onPress={()=>{
             submitHandler()
          }} />
      </View>
     </View>
    )
  })}, [props.navigation,submitHandler]);

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => { 
    dispatchFormState(
      {
        type: FORM_INPUT_UPDATE,
        value: inputValue, 
        isValid: inputValidity,
        input: inputIdentifier
      })
  },[dispatchFormState])

  if(isLoading){
    return <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary}/>
    </View>
  }

  return (
    <KeyboardAvoidingView
    style={{flex:1}}
    keyboardVerticalOffset={100}
    >
    <ScrollView>
      <View style={styles.form}>
        <Input
          id='title'
          label='Title'
          errorText = 'Please enter a valid title!'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType = 'next'
          initialValue = {product? product.title : ''}
          initiallyValid = {!!product}
          onInputChange={inputChangeHandler}
          required
         />
         <Input
          id='imageUrl'
          label='Image Url'
          errorText = 'Please enter a valid image url!'
          keyboardType='default'
          returnKeyType = 'next'
          initialValue = {product? product.imageUrl : ''}
          onInputChange={inputChangeHandler}
          initiallyValid = {!!product}
          required
         />
        {product ? false : ( 
               <Input
               id='price'
               label='Price'
               errorText = 'Please enter a valid price!'
               keyboardType='decimal-pad'
               returnKeyType = 'next'
               onInputChange={inputChangeHandler}
               required
               min={0.1}
              />
      )}
              <Input
               id='description'
               label='Description'
               errorText = 'Please enter a valid description!'
               keyboardType='default'
               autoCapitalize='sentences'
               onInputChange={inputChangeHandler}
               returnKeyType = 'next'
               autoCorrect
               initialValue = {product? product.description : ''}
               initiallyValid = {!!product}
               required
               minLength={5}
              />
      </View>
      <Button title='hit' onPress={()=>{
        console.log(props.route)
      }}/>
    </ScrollView>
    </KeyboardAvoidingView>
     )
}

const styles = StyleSheet.create({
  cartHeaderButtonContainer:{
    overflow:'hidden',
    marginHorizontal:5,
  },
  menuHeaderButton:{
    elevation:0
  },
  form:{margin:20},
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})

export default EditProductsScreen
