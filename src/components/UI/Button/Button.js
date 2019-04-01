import React from "react";
import styles from "./Button.module.css";

const Button = props => {
  return (
    <div className={styles.customButton} onClick={props.click}>
      <span>{props.children}</span>
    </div>
  );
};

export default Button;
