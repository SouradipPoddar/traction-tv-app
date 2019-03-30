import React from "react";
import "./SearchResults.css";
import SearchResult from "./SearchResult/SearchResult";
const SearchResults = props => (
  <React.Fragment>
    <div className="searchText">
      <span>Search Results</span>
      <hr />
    </div>
    <div className="result">
      {props.results.map((item, i) => {
        return <SearchResult source={item.poster_path} name={item.name} />;
      })}
    </div>
  </React.Fragment>
);

export default SearchResults;
