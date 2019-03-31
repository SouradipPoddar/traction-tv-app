import React from "react";
import styles from "./Tag.module.css";

const Tag = props => {
  return <div className={styles.tagStyle}>{props.children}</div>;
};

export default Tag;
