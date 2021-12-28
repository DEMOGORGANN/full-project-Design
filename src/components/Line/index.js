import React, { useState, useLayoutEffect, useRef } from "react";
import styles from "./Line.module.scss";

const Line = () => {
  const [count, setCount] = useState(3);
  const refContainer = useRef(null);
  const refLine = useRef(null);
 
  useLayoutEffect(() => {
    if (refLine.current.clientWidth && refContainer.current.clientWidth) {
      let n = Math.floor(
        (refContainer.current.clientWidth * 2) / refLine.current.clientWidth
      );
      setCount(n);
    }
  }, []);

  return (
    <div className={styles.line} ref={refContainer}>
      <div ref={refLine} className={styles.line__content}>
        Delight sale
      </div>
      {[...Array(count)].map((item, i) => (
        <div key={i} className={styles.line__content}>
          Delight sale{" "}
        </div>
      ))}
    </div>
  );
};

export default Line;
