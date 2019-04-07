import React from "react";
import styles from "./NavigationButtonset.module.css";

const NavigationButtonset = props => {
  return (
    <div className={styles.navButtons}>
      <i
        className="fas fa-2x fa-caret-square-left"
        onClick={props.leftNavFunction}
        style={{
          visibility: props.currentPosition === 0 ? "hidden" : "initial"
        }}
      />
      <i
        className="fas fa-2x fa-caret-square-right"
        onClick={props.rightNavFunction}
        style={{
          visibility: props.visible
        }}
      />
    </div>
  );
};

export default NavigationButtonset;
