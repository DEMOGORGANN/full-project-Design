import {
	CHANGE_LANG
  } from "../constants/langConstants";

  export const langChange = (lang)  => {
	return {
	  type: CHANGE_LANG,
	  payload: lang
	};
	
  };