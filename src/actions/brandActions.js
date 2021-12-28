import dataApi from "../data";

// import Axios from 'axios';
import {
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
} from "../constants/brandConstants";

export const listBrands = () => async (dispatch) => {
	dispatch({
	  type: BRAND_LIST_REQUEST,
	});
	try {
	  // const { data } = await Axios.get(`/api/products/brands`);
	  const data = dataApi.brands;
	  dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
	} catch (error) {
	  const message =
		error.response && error.response.data.message
		  ? error.response.data.message
		  : error.message;
	  dispatch({ type: BRAND_LIST_FAIL, payload: message });
	}
  };
  