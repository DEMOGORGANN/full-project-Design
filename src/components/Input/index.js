import React, { useState } from "react";
import styles from "./Input.module.scss";
import classnames from "classnames";

const Input = (props) => {
  const [hasFocus, setFocus] = useState(props.value);
  const focusHandler = () => {
    setFocus(true);
  };
  const blurHandler = (e) => {
    if (!e.target.value) {
      setFocus(false);
    }
  };
  return (
    <div className={styles.container}>
      <input
        className="input"
        type="text"
        onFocus={focusHandler}
        onBlur={blurHandler}
        defaultValue={props.value}
      />
      <span className={classnames(styles.ph, { [styles.active]: hasFocus })}>
        {props.ph}
      </span>
    </div>
  );
};

export default Input;
