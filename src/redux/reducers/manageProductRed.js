import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_LOADING,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_LOADING
} from "../action/types";

const initialState = {
  loading: false,
  error: false,
  addProduct: false,
  dataProduct: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return { ...state, addProduct: true, dataProduct: action.payload };
    case ADD_PRODUCT_LOADING:
      return { ...state, loading: true };
    case ADD_PRODUCT_ERROR:
      return { ...state, error: true };
    case GET_PRODUCT_SUCCESS:
      return { ...state, dataProduct: action.payload };
    case GET_PRODUCT_LOADING:
      return { ...state, loading: true };
    case GET_PRODUCT_ERROR:
      return { ...state, error: true };
    case DELETE_PRODUCT_LOADING:
      return { ...state, loading: true };
    case DELETE_PRODUCT_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
};
