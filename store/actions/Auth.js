import AsyncStorage from '@react-native-community/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENICATE = 'AUTHENICATE';

export const logout = () => {
  return {type: LOGOUT }
}

export const authenticate = (userId, token) => {
  return {type: AUTHENICATE, userId:userId, token:token}
}

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch('',
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:email,
        password:password,
        returnSecureToken: true
      })
    }
    );

    if(!response.ok){
     const errorResData = await response.json();
     const errorId = errorResData.error.message;

     let message = 'Something went wrong';
     if(errorId === 'EMAIL_EXISTS'){
       message = 'This email exists already'
     }else if(errorId === 'INVALID_EMAIL'){
      message = 'This email is invalid!';
    }
    else if (errorId === 'INVALID_PASSWORD'){
      message = 'This password is invalid';
    }
    else if (errorId === 'MISSING_PASSWORD'){
      message = 'This password is missing';
    }
     throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken))
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch('',
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:email,
        password:password,
        returnSecureToken: true
      })
      
    }
    
    );
    
    if(!response.ok){
      const errorResData = await response.json();
      console.log(errorResData)
      const errorId = errorResData.error.message;
      console.log(errorId)
      let message = 'Something went wrong';
      if(errorId === 'EMAIL_NOT_FOUND'){
        message = 'This email could not be found!';
      }else if(errorId === 'INVALID_EMAIL'){
        message = 'This email is invalid!';
      }
      else if (errorId === 'INVALID_PASSWORD'){
        message = 'This password is invalid';
      }
      else if (errorId === 'MISSING_PASSWORD'){
        message = 'This password is missing';
      }
      throw new Error(message)
    }
  
    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken))
    
      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      savedDataToStorage(resData.idToken, resData.localId, expirationDate);
  }
}

const savedDataToStorage = async (token, userId, expirationDate) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    }))
    console.log('SAVE SUCCESS')
  } catch (error) {
    console.log(error)
  }

}