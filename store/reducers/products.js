import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';

const initalState = {
  availableProducts: [],
  userProducts: []
};

const productsReducer = (state = initalState, action) => {

  switch (action.type) {
    case SET_PRODUCTS:
      // console.log("ACTION PRODUCTS",action.products)
      return{
        availableProducts: action.products,
        userProducts: action.userProducts
      }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price,
        );
        return {
          ...state,
          availableProducts: state.availableProducts.concat(newProduct),
          userProducts: state.userProducts.concat(newProduct),
        };
    case UPDATE_PRODUCT:
      // click on something else for submitting
      const productIndex = state.userProducts.findIndex(prod=> prod.id === action.pid);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
        )
        const updatedUserProducts = [...state.userProducts];
        // console.log('ACTIONS', action)

        updatedUserProducts[productIndex] = updatedProduct;
        const availableProductIndex = state.availableProducts.findIndex(
          prod=> prod.id === action.pid
        );
        //  console.log("Available product index", availableProductIndex)
        const updatedAvailableProducts = [...state.availableProducts];
        updatedAvailableProducts[availableProductIndex] = updatedProduct;
        //  console.log("Change Product", updatedAvailableProducts)
        return{
          ...state,
          availableProducts: updatedAvailableProducts,
          userProducts: updatedUserProducts
        }
    case DELETE_PRODUCT:
      return{
        ...state,
        userProducts: state.userProducts.filter(item=> item.id !== action.pid),
        availableProducts: state.availableProducts.filter(item=> item.id !== action.pid),
      }

    default:
      return {
        ...state
      }
  }
}; 

export default productsReducer;