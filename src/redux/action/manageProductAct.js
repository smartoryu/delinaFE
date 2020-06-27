import {
  //   ADD_PRODUCT_ERROR,
  //   ADD_PRODUCT_LOADING,
  //   ADD_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_LOADING
} from "./types";

import Axios from "axios";
import { API } from "../../API";

export const getProduct = () => {
  return dispatch => {
    dispatch({ type: GET_PRODUCT_LOADING });
    Axios.get(`${API}/data_product/product`)
      .then(res => {
        console.log("getProduct", res.data);
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data });
      })
      .catch(err => dispatch({ type: GET_PRODUCT_ERROR }));
  };
};

export const deleteProduct = ({ id }) => {
  return dispatch => {
    dispatch({ type: DELETE_PRODUCT_LOADING });
    Axios.delete(`${API}/data_product/deleteProduct/`, { id })
      .then(res => {
        if (res.data.dataProduct) {
          dispatch(getProduct());
        }
        dispatch({ type: DELETE_PRODUCT_ERROR });
      })
      .catch(err => console.log(err));
  };
};
