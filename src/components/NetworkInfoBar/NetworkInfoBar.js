import React from "react";
import styles from "./NetworkInfoBar.module.css";

const NetworkInfoBar = props => {
  return (
    <span className={[styles.info, styles.networkBar].join(" ")}>
      {props.networkList
        .map((item, i) => {
          return item.name;
        })
        .join(" ")}
    </span>
  );
};

export default NetworkInfoBar;
