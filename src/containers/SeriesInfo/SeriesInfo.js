import React, { Component } from "react";
import "./SeriesInfo.css";
import { axiosTmdb } from "../../axios-tmdb";
import ActionList from "../../components/ActionList/ActionList";
import RatingBar from "../../components/RatingBar/RatingBar";
import NetworkInfoBar from "../../components/NetworkInfoBar/NetworkInfoBar";
import firebaseSetup from "../../firebase-db";
import Tags from "../../components/Tags/Tags";
import SeasonInfo from "../SeasonInfo/SeasonInfo";
import { Route, Switch } from "react-router-dom";
import EpisodeListInfo from "../EpisodeListInfo/EpisodeListInfo";
import { connect } from "react-redux";

class SeriesInfo extends Component {
  state = {
    data: null,
    tags: null,
    showTagModal: false,
    tagValues: [],
    tagList: [
      "bingeWorthy",
      "brainStorming",
      "decreasingQuality",
      "fastPaced",
      "funny",
      "goodForCouples",
      "intellectual",
      "miniSeries",
      "mustWatch",
      "shortEpisodes",
      "simplePlot"
    ]
  };

  toggleTagModalHandler = () => {
    this.setState((prevState, nextProps) => {
      return { showTagModal: !prevState.showTagModal };
    });
  };

  updateTagValues = () => {
    const db = firebaseSetup.firestore();
    db.collection("tags")
      .doc(this.props.match.params.id)
      .get()
      .then(resp => {
        let newTags;
        if (!resp.exists) {
          newTags = {};
          for (let i in this.state.tagList) {
            newTags[this.state.tagList[i]] = +this.props.tagValues[i];
          }
        } else {
          console.log(this.props.tagValues);
          newTags = resp.data();
          let keys = Object.keys(newTags);
          for (let i in keys) {
            if (this.props.tagValues[i]) {
              newTags[keys[i]] = newTags[keys[i]] + 1;
            }
          }
        }
        console.log(newTags);
        db.collection("tags")
          .doc(this.props.match.params.id)
          .set(newTags)
          .then(resp => {
            console.log("Success.Go to Sleep");
            this.setState({ showTagModal: false, tags: newTags });
          });

        this.setState({ showTagModal: false });
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  };

  componentDidUpdate = () => {
    //console.log("From JS");
    if (
      this.state.data !== null &&
      this.state.data.id.toString() !== this.props.match.params.id
    ) {
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

      const db = firebaseSetup.firestore();
      db.collection("tags")
        .doc(this.props.match.params.id)
        .get()
        .then(resp => {
          if (!resp.exists) {
            let emptyTags = {};
            for (let i in this.state.tagList) {
              emptyTags[this.state.tagList[i]] = 0;
            }
            this.setState({
              tags: emptyTags,
              tagValues: new Array(Object.keys(emptyTags).length).fill(false)
            });
          } else {
            console.log(Object.keys(resp.data).length);
            this.setState({
              tags: resp.data(),
              tagValues: new Array(Object.keys(resp.data()).length).fill(false)
            });
          }
          console.log(this.props.tagValues);
        })

        .catch(err => {
          console.log("Error getting document", err);
        });
    }
  };

  componentDidMount() {
    //console.log("From JS");

    let data = { api_key: process.env.REACT_APP_TMDB_KEY };
    axiosTmdb
      .get("/tv/" + this.props.match.params.id, { params: data })
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    const db = firebaseSetup.firestore();
    db.collection("tags")
      .doc(this.props.match.params.id)
      .get()
      .then(resp => {
        if (!resp.exists) {
          let emptyTags = {};
          for (let i in this.state.tagList) {
            emptyTags[this.state.tagList[i]] = 0;
          }
          this.setState({
            tags: emptyTags,
            tagValues: new Array(Object.keys(emptyTags).length).fill(false)
          });
          this.props.fillArray(Object.keys(emptyTags).length);
        } else {
          console.log(resp.data());
          this.setState({
            tags: resp.data(),
            tagValues: new Array(Object.keys(resp.data()).length).fill(false)
          });
          this.props.fillArray(Object.keys(resp.data()).length);
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
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
              <p className="overviewPara">{this.state.data.overview}</p>
              <br />
              <br />
              <div className="infoList">
                <span className="info">{this.state.data.status}</span>
                <ul className="genreList">{genreList}</ul>
                <ActionList homepage={this.state.data.homepage} />
              </div>
              <div className="infoList">
                <div className="ratingBar">
                  <RatingBar rating={this.state.data.vote_average} />
                </div>
                <span className="info durationBar">
                  {this.state.data.episode_run_time[0] + " min"}
                </span>
                <NetworkInfoBar networkList={this.state.data.networks} />
              </div>

              <div>
                <Switch>
                  <Route
                    path={this.props.match.url}
                    exact
                    component={props => (
                      <SeasonInfo
                        seasonInfo={this.state.data.seasons}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path={this.props.match.url + "/seasons/:seasonNumber"}
                    component={props => (
                      <EpisodeListInfo
                        seriesId={this.props.match.params.id}
                        {...props}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
          <div className="tagPosition">
            <Tags
              tagList={this.state.tags}
              showNewTagModal={this.state.showTagModal}
              addButtonClick={this.toggleTagModalHandler}
              valueArray={this.props.tagValues}
              checkboxValues={this.props.toggleCheckboxValue}
              addTag={this.updateTagValues}
            />
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

const mapStateToProps = state => {
  return {
    tagValues: state.tagValues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fillArray: length => dispatch({ type: "FILL_TAGS", length: length }),
    toggleCheckboxValue: index => dispatch({ type: "TOGGLE_BOX", index: index })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesInfo);
