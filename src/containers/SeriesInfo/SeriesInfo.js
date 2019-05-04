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
import * as actions from "../../store/actions/tagActions";

class SeriesInfo extends Component {
  state = {
    showTagModal: false
  };

  toggleTagModalHandler = () => {
    this.setState((prevState, nextProps) => {
      return { showTagModal: !prevState.showTagModal };
    });
  };

  componentDidUpdate = () => {
    //console.log("From JS");
    if (
      this.props.data !== null &&
      this.props.data.id.toString() !== this.props.match.params.id
    ) {
      this.props.fetchData(this.props.match.params.id);
      this.props.populateData(this.props.match.params.id);
    }
  };

  componentDidMount() {
    this.props.fetchData(this.props.match.params.id);
    this.props.populateData(this.props.match.params.id);
  }

  render() {
    let genreList = null;
    //console.log(this.props);

    let pageBasics = null;
    if (this.props.data !== null) {
      genreList = this.props.data.genres.map((item, i) => {
        return (
          <li className="genreListItem" key={i}>
            {item.name}
          </li>
        );
      });

      pageBasics = (
        <div className="basicPage">
          <div className="overview">
            <span className="title">{this.props.data.name}</span>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div className="poster">
              <img
                className="imageShadow"
                src={
                  "https://image.tmdb.org/t/p/w300/" +
                  this.props.data.poster_path
                }
                alt=""
              />
            </div>
            <div className="overviewText">
              <p className="overviewPara">{this.props.data.overview}</p>
              <br />
              <br />
              <div className="infoList">
                <span className="info">{this.props.data.status}</span>
                <ul className="genreList">{genreList}</ul>
                <ActionList homepage={this.props.data.homepage} />
              </div>
              <div className="infoList">
                <div className="ratingBar">
                  <RatingBar rating={this.props.data.vote_average} />
                </div>
                <span className="info durationBar">
                  {this.props.data.episode_run_time[0] + " min"}
                </span>
                <NetworkInfoBar networkList={this.props.data.networks} />
              </div>

              <div>
                <Switch>
                  <Route
                    path={this.props.match.url}
                    exact
                    component={props => (
                      <SeasonInfo
                        seasonInfo={this.props.data.seasons}
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
              tagList={this.props.tags}
              showNewTagModal={this.props.showTagModal}
              addButtonClick={this.props.toggleModal}
              valueArray={this.props.tagValues}
              checkboxValues={this.props.toggleCheckboxValue}
              addTag={() => this.props.updateTags(this.props.match.params.id)}
            />
          </div>

          <img
            src={
              "https://image.tmdb.org/t/p/w780/" + this.props.data.backdrop_path
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
    tagValues: state.tagValues,
    tags: state.tags,
    data: state.data,
    showTagModal: state.showTagModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fillArray: length => dispatch(actions.fillTags(length)),
    toggleCheckboxValue: index => dispatch(actions.toggleBox(index)),
    updateTags: showId => dispatch(actions.updateTags(showId)),
    fetchData: showId => dispatch(actions.fetchData(showId)),
    populateData: showId => dispatch(actions.populateData(showId)),
    toggleModal: () => dispatch(actions.toggleModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesInfo);
