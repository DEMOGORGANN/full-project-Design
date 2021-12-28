import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const CssTextField = styled(TextField)({
	"& .MuiInput-input": {
	  color: "#222222",
	  fontSize: 16,
	  fontFamily: "PTRootUIWebVF, sans-serif",
	  padding: "10px 0 10px",
	  borderBottom: "1px solid #222222",
	  height: "auto",
	},
	"& .MuiInputLabel-root": {
	  color: "#222222",
	  fontSize: 16,
	  fontFamily: "PTRootUIWebVF, sans-serif",
	  zIndex: 10,
	},
	"& label.Mui-focused": {
	  color: "#000",
	},
	"& label.Mui-focused.Mui-error": {
	  color: "#d32f2f",
	},
	"& .MuiInput-underline:after": {
	  borderBottom: "2px solid #222222",
	},
	"& .MuiInput-underline:before": {
	  display: "none",
	},
 
	"& label+.MuiInput-root": {
	  marginTop: 10,
	},
	"& .MuiFormHelperText-root.Mui-error": {
	  position: "absolute",
	  top: "100%",
	  left: 0,
	},
 });