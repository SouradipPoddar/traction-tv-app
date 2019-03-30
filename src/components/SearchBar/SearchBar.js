import React from "react";
import "./SearchBar.css";
import Suggestions from "./Suggestions/Suggestions";

const SearchBar = props => (
  <div className="Toolbar">
    <div className="wrapperDiv">
      <input
        className="searchPanel"
        spellCheck="false"
        placeholder="Search TV Shows..."
        onChange={props.changeValue}
        onFocus={props.focusFunc}
      />
      <div>
        <i className="fas fa-search fa-sm" />
      </div>
    </div>
    <Suggestions
      suggestionsList={props.suggestions}
      showState={props.show}
      backdropClick={props.focusFunc}
    />
  </div>
);

export default SearchBar;
