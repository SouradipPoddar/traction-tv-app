import React from "react";
import styles from "./ActionList.module.css";

const ActionList = props => {
  return (
    <div className={styles.actionList}>
      <div className={styles.icon}>
        <i className={["fas fa-plus", styles.whiteIcon].join(" ")} />
      </div>
      <div className={styles.icon} onClick={props.favAdd}>
        <i
          className={[
            "fas fa-heart",
            props.isFav ? styles.iconFav : styles.whiteIcon
          ].join(" ")}
        />
      </div>
      <a href={props.homepage}>
        <div className={styles.icon}>
          <i className={["fas fa-eye", styles.whiteIcon].join(" ")} />
        </div>
      </a>
    </div>
  );
};

export default ActionList;
