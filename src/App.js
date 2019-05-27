import React, { Component } from "react";
import "./App.css";
import SearchPage from "./components/SearchPage/SearchPage";
import SeriesInfo from "./containers/SeriesInfo/SeriesInfo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";
import Favourites from "./containers/Favourites/Favourites";
import * as authActions from "./store/actions/authActions";

class App extends Component {
  componentDidMount() {
    this.props.reAuthUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SearchPage />
        </div>
        <Switch>
          <Route path="/show/:id" component={SeriesInfo} />
          <Route path="/login" component={Auth} />
          <Route path="/favourites" component={Favourites} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reAuthUser: () => dispatch(authActions.reAuthUser())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(App);
