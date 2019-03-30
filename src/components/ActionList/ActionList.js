import React from "react";
import "./ActionList.css";

const ActionList = props => {
  return (
    <div className="actionList">
      <div className="icon">
        <i className="fas fa-plus" />
      </div>
      <div className="icon">
        <i className="fas fa-heart" />
      </div>
      <a href={props.homepage}>
        <div className="icon">
          <i className="fas fa-eye" />
        </div>
      </a>
    </div>
  );
};

export default ActionList;
