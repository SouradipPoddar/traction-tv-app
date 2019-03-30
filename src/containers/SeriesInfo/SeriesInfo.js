import React, { Component } from "react";
import "./SeriesInfo.css";
import { axiosTmdb } from "../../axios-tmdb";
import ActionList from "../../components/ActionList/ActionList";
import RatingBar from "../../components/RatingBar/RatingBar";
import NetworkInfoBar from "../../components/NetworkInfoBar/NetworkInfoBar";
import firebaseSetup from "../../firebase-db";

class SeriesInfo extends Component {
  state = {
    data: null
  };

  componentDidUpdate = () => {
    //console.log("From JS");
    if (this.state.data.id.toString() !== this.props.match.params.id) {
      let data = { api_key: process.env.REACT_APP_TMDB_KEY };

      console.log(process.env);

      axiosTmdb
        .get("/tv/" + this.props.match.params.id, { params: data })
        .then(response => {
          console.log(response.data);
          this.setState({
            data: response.data
          });
        });
    }
    const db = firebaseSetup.firestore();
    db.collection("tags")
      .doc("1399")
      .get()
      .then(resp => {
        console.log(resp.data());
      });
  };

  componentDidMount() {
    //console.log("From JS");

    let data = { api_key: process.env.REACT_APP_TMDB_KEY };
    axiosTmdb
      .get("/tv/" + this.props.match.params.id, { params: data })
      .then(response => {
        //console.log(response.data);
        this.setState({
          data: response.data
        });
      });
  }

  render() {
    let genreList = null;
    //console.log(this.props);

    let pageBasics = null;
    if (this.state.data !== null) {
      genreList = this.state.data.genres.map((item, i) => {
        return (
          <li className="genreListItem" key={i}>
            {item.name}
          </li>
        );
      });

      pageBasics = (
        <div className="basicPage">
          <div className="overview">
            <span className="title">{this.state.data.name}</span>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div className="poster">
              <img
                className="imageShadow"
                src={
                  "https://image.tmdb.org/t/p/w300/" +
                  this.state.data.poster_path
                }
                alt=""
              />
            </div>
            <div className="overviewText">
              <p>{this.state.data.overview}</p>
              <br />
              <br />
              <div className="infoList">
                <span className="info">{this.state.data.status}</span>
                <ul className="genreList">{genreList}</ul>
                <ActionList homepage={this.state.data.homepage} />
              </div>
              <div className="infoList">
                <RatingBar rating={this.state.data.vote_average} />
                <span className="info durationBar">
                  {this.state.data.episode_run_time[0] + " min"}
                </span>
                <NetworkInfoBar networkList={this.state.data.networks} />
              </div>
            </div>
          </div>
          <img
            src={
              "https://image.tmdb.org/t/p/w780/" + this.state.data.backdrop_path
            }
            alt=""
            className="backdrop"
          />
        </div>
      );
    }

    return <div>{pageBasics}</div>;
  }
}

export default SeriesInfo;
