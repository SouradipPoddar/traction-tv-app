import React from "react";
import styles from "./NetworkInfoBar.module.css";

const NetworkInfoBar = props => {
  return (
    <div className={[styles.info, styles.networkBar].join(" ")}>
      {props.networkList.map((item, i) => {
        return (
          <span className={styles.networkList} key={i}>
            {item.name}
          </span>
        );
      })}
    </div>
  );
};

export default NetworkInfoBar;
