import {
	BRAND_LIST_REQUEST,
	BRAND_LIST_SUCCESS,
	BRAND_LIST_FAIL,
  } from "../constants/brandConstants";

  const chunkArray = (array, chunk) => {
	const newArray = [];
	for (let i = 0; i < array.length; i += chunk) {
	  newArray.push(array.slice(i, i + chunk));
	}
	return newArray;
  };

  export const brandListReducer = (
	state = { loading: true, brandsBlockTop:[], brandsBlockTmpl:[]},
	action
  ) => {
	switch (action.type) {
	  case BRAND_LIST_REQUEST:
		return {...state, loading: true };
	  case BRAND_LIST_SUCCESS:
		let brands = action.payload;
		const blockTop = brands.slice(0, 4);
		const blockTmpl = chunkArray(brands.slice(4), 6);
	  return { 
			...state,
			loading: false, 
			brandsBlockTop: blockTop,
			brandsBlockTmpl: blockTmpl
		 };
	  case BRAND_LIST_FAIL:
		return {...state, loading: false, error: action.payload };
	  default:
		return state;
	}
  };
  
