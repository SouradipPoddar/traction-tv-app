import React from "react";
import "./SearchResult.css";

const SearchResult = props => {
  return (
    <div className="resultCard">
      <img
        className="resultImage"
        src={"http://image.tmdb.org/t/p/w185" + props.source}
        alt="blackMirror"
      />
      <span>{props.name}</span>
    </div>
  );
};

export default SearchResult;
