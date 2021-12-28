import dataApi from "../data";

// import Axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LABEL_LIST_FAIL,
  PRODUCT_LABEL_LIST_REQUEST,
  PRODUCT_LABEL_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";

export const listProducts =
  ({ pageNumber = "", catalogTypeBrands = "", catalogTypeCategory = "",  slug = "", order = "" }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      //   const { data } = await Axios.get(
      // 	`/api/products?pageNumber=${pageNumber}&catalogTypeBrands=${catalogTypeBrands}&catalogTypeCategory=${catalogTypeCategory}&slug=${slug}&order=${order}`
      //   );
      const data = await dataApi.products;
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const listLabelProducts =
  ({ bestseller = "", promo = ""}) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LABEL_LIST_REQUEST,
    });
    try {
      //   const { data } = await Axios.get(
      // 	`/api/products?bestseller=${bestseller}&promo=${promo}`
      //   );
      const data = await dataApi.products;
      dispatch({ type: PRODUCT_LABEL_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LABEL_LIST_FAIL, payload: error.message });
    }
  };

  export const detailsProduct = (productId) => async (dispatch) => {
	dispatch({ type: PRODUCT_DETAILS_REQUEST, });
	try {
	//   const { data } = await Axios.get(`/api/products/${productId}`);
	const data = dataApi.product;
	  dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
	  dispatch({
		type: PRODUCT_DETAILS_FAIL,
		payload:
		  error.response && error.response.data.message
			? error.response.data.message
			: error.message
	  });
	}
  };

