import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = props => {
  return (
    <div className={styles.checkboxStyle} onClick={props.clicked}>
      <i
        className={[
          "fas fa-check fa-xs",
          props.checked ? null : styles.notCheked
        ].join(" ")}
      />
    </div>
  );
};

export default Checkbox;
