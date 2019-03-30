import React, { Component } from "react";
import "./App.css";
import SearchPage from "./components/SearchPage/SearchPage";
import SeriesInfo from "./containers/SeriesInfo/SeriesInfo";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SearchPage />
          {/*<SeriesInfo seriesId="63247" />*/}
        </div>
        <Route path="/show/:id" component={SeriesInfo} />
      </BrowserRouter>
    );
  }
}

export default App;
