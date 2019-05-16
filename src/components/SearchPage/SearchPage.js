import React, { Component } from "react";
import "./SearchPage.css";
import "../SearchBar/SearchBar";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import { connect } from "react-redux";

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
            .get("http://54.243.244.135/3/search/tv", {
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
          userId={this.props.userId ? this.props.userId.split("@")[0] : null}
        />
        {/*<SearchResults results={this.state.suggestions} />*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps)(SearchPage);
