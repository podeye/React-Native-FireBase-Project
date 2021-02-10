import PRODUCTS from '../../data/dummy-data'

const initalState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod=> prod.ownerId === 'u1')
};

const productsReducer = (state = initalState, action) => {
  return state;
};

export default productsReducer;