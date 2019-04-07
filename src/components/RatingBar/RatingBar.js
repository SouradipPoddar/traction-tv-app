import React from "react";
import styles from "./RatingBar.module.css";

const RatingBar = props => {
  let fullStar = [...Array(Math.round(props.rating / 2))].map((item, i) => {
    return <i key={i} className="fas fa-star" />;
  });

  let emptyStar = [...Array(5 - Math.round(props.rating / 2))].map(
    (item, i) => {
      return <i key={i} className="far fa-star" />;
    }
  );
  return (
    <div className={styles.ratingDiv}>
      {fullStar}
      {emptyStar}
      <span className={styles.ratingText}>{props.rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingBar;
