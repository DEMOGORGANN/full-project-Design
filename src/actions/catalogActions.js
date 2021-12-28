import dataApi from "../data";

// import Axios from 'axios';

import {
  CATALOG_DETAILS_REQUEST,
  CATALOG_DETAILS_SUCCESS,
  CATALOG_DETAILS_FAIL,
} from "../constants/catalogConstants";

export const detailsCatalog = ({  catalogTypeBrands = "", catalogTypeCategory = "",  slug = ""}) => async (dispatch) => {
	dispatch({ type: CATALOG_DETAILS_REQUEST,  });
	try {
	//   const { data } = await Axios.get(`/api/catalog?catalogTypeBrands=${catalogTypeBrands}&catalogTypeCategory=${catalogTypeCategory}&slug=${slug}`);
	const data = await dataApi.catalog;
	  dispatch({ type: CATALOG_DETAILS_SUCCESS, payload: data });
	} catch (error) {
	  dispatch({
		type: CATALOG_DETAILS_FAIL,
		payload:
		  error.response && error.response.data.message
			? error.response.data.message
			: error.message
	  });
	}
  };
