import React from "react";
import "./Suggestions.css";
import { Link } from "react-router-dom";

const suggestions = props => {
  let suggestionsList = props.suggestionsList.slice(0, 8).map((item, i) => {
    return (
      <Link to={"/show/" + item.id} key={i}>
        <p>{item.name}</p>
      </Link>
    );
  });
  let assignedClasses = ["Suggestions"];
  let backdropClass = ["backdropBlack"];
  if (suggestionsList.length === 0 || !props.showState) {
    assignedClasses.push("invisible");
    backdropClass.push("invisible");
  }

  return (
    <React.Fragment>
      <div className={assignedClasses.join(" ")}>{suggestionsList}</div>
      <div className={backdropClass.join(" ")} onClick={props.backdropClick}>
        &nbsp;
      </div>
    </React.Fragment>
  );
};

export default suggestions;
