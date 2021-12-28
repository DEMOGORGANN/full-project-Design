import {
	CHANGE_LANG
  } from "../constants/langConstants";

  export const langReducer = (state = { currentLang: {} },
	action) => {
	switch (action.type) {
	  case CHANGE_LANG:
		return { ...state, currentLang: action.payload };
	 
	  default:
		return state;
	}
  };
