import {
	CATALOG_DETAILS_REQUEST,
	CATALOG_DETAILS_SUCCESS,
	CATALOG_DETAILS_FAIL,
  } from "../constants/catalogConstants";

  export const catalogDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	  case CATALOG_DETAILS_REQUEST:
		return { ...state, loading: true };
	  case CATALOG_DETAILS_SUCCESS:
		return {...state, loading: false, catalog: action.payload };
	  case CATALOG_DETAILS_FAIL:
		return {...state, loading: false, error: action.payload };
	  default:
		return state;
	}
  };
  