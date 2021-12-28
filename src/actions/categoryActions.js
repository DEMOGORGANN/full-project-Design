import dataApi from "../data";

// import Axios from 'axios';

import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
  } from "../constants/categoryConstants";

  export const listCategories = () => async (dispatch) => {
	dispatch({
	  type: CATEGORY_LIST_REQUEST,
	});
	try {
	  // const { data } = await Axios.get(`/api/products/categories?`);
	  const data = await dataApi.category;
	  dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
	} catch (error) {
	  dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
	}
  };
  