import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
  } from "../constants/categoryConstants";

  export const categoryListReducer = (
	state = { loading: true, categories: [] },
	action
  ) => {
	switch (action.type) {
	  case CATEGORY_LIST_REQUEST:
		return { ...state, loading: true };
	  case CATEGORY_LIST_SUCCESS:
		return { ...state, loading: false, categories: action.payload };
	  case CATEGORY_LIST_FAIL:
		return { ...state, loading: false, error: action.payload };
	  default:
		return state;
	}
  };


