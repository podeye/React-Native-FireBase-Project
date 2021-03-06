import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch('');
      
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      
      const resData = await response.json();
      // console.log("RES DATA",resData)
      const loadedProducts = [];
      for (const key in resData){
        loadedProducts.push(new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price))
      }
      // console.log('LOADED PRODUCTS', loadedProducts)
      dispatch({
        type:SET_PRODUCTS, 
        products: loadedProducts, 
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)})
    } catch (error) {
      throw error;
    }
  
  }
}

export const deleteProduct = productId => {
  return async (dispatch,getState) => {
  const token = getState().auth.token;
  const response = await fetch(
    ``
    , {
    method: 'DELETE',
  });
  if(!response.ok){
    throw new Error('Something went wrong');
  }
  

    dispatch ({type: DELETE_PRODUCT, pid:productId})
  };
  
}

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // here can execute any async function you want including http requests
    const response = await fetch(``, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      // no id, firebase generates an id
      body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId
        })
    });

    const resData = await response.json();
    // console.log(resData)
    // fetch can be used for any http request
    // firebase requires .json
    dispatch({ 
      type:CREATE_PRODUCT, 
      productData:{
      id: resData.name,
      title,
      description,
      imageUrl,
      price,
      ownerId: userId
    }})
  }
}
export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    // Error checking .jon
    const token = getState().auth.token;
    const response = await fetch(``, {
      method: 'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      // no id, firebase generates an id
      body: JSON.stringify({
          title,
          description,
          imageUrl,
        })
    });

    if(!response.ok){
      throw new Error("Something went wrong");
    }

    dispatch ({ 
      type:UPDATE_PRODUCT,
      pid:id,
      productData:{
      id,
      title,
      description,
      imageUrl
    }})
  }

}