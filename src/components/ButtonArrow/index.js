import React from "react";
import styles from "./ButtonArrow.module.scss";

const ButtonArrow = ({ color, text }) => {
	return (
    <div className={styles.button}>
		 <span style={{color: color}}>
		 {text}
		 </span>
    
      <svg
        width="27"
        height="19"
        viewBox="0 0 27 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.8352 9.10231L18.3977 0.664808C18.178 0.445064 17.822 0.445064 17.6023 0.664808C17.3826 0.884552 17.3826 1.24051 17.6023 1.4602L25.0796 8.93751H0.562518C0.251596 8.93751 0 9.18911 0 9.50003C0 9.81095 0.251596 10.0625 0.562518 10.0625H25.0796L17.6023 17.5398C17.3826 17.7595 17.3826 18.1155 17.6023 18.3352C17.7122 18.445 17.8561 18.5 18 18.5C18.1439 18.5 18.2879 18.445 18.3978 18.3352L26.8353 9.8977C27.0549 9.67801 27.0549 9.32205 26.8352 9.10231Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default ButtonArrow;
