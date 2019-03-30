import React, { Component } from "react";
import "./SearchPage.css";
import "../SearchBar/SearchBar";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";

class SearchPage extends Component {
  state = {
    suggestions: [],
    suggestionVisibility: false
  };

  timer = null;
  fetchSuggestionsHandler = event => {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      value => {
        console.log(value);
        let respSuggestions = [];
        if (value.length !== 0) {
          axios
            .get("https://api.themoviedb.org/3/search/tv", {
              params: {
                api_key: process.env.REACT_APP_TMDB_KEY,
                language: "en-US",
                query: value,
                page: 1
              }
            })
            .then(response => {
              // handle success
              //data.results
              respSuggestions = response.data.results;
              this.setState({ suggestions: respSuggestions });
              console.log(response.data);
            });
        } else {
          this.setState({ suggestions: respSuggestions });
        }
      },
      700,
      event.target.value
    );
  };

  suggestionToggleHandler = () => {
    this.setState((prevState, nextProps) => {
      return {
        suggestionVisibility: !prevState.suggestionVisibility
      };
    });
    // this.setState({ suggestionVisibility: !this.state.suggestionVisibility });
  };

  render() {
    return (
      <div>
        <SearchBar
          changeValue={this.fetchSuggestionsHandler}
          suggestions={this.state.suggestions}
          focusFunc={this.suggestionToggleHandler}
          show={this.state.suggestionVisibility}
        />
        {/*<SearchResults results={this.state.suggestions} />*/}
      </div>
    );
  }
}

export default SearchPage;
