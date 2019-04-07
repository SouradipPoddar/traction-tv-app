import React, { Component } from "react";
import styles from "./EpisodeListInfo.module.css";
import { axiosTmdb } from "../../axios-tmdb";
import RatingBar from "../../components/RatingBar/RatingBar";
import NavigationButtonset from "../../components/UI/NavigationButtonset/NavigationButtonset";
import Button from "../../components/UI/Button/Button";

class EpisodeListInfo extends Component {
  state = {
    epidodeImage: null,
    episodeOverview: null,
    currentEpisode: 0,
    response: null,
    page: 0
  };

  rightNav = () => {
    this.setState((prevState, nextProps) => {
      return { page: prevState.page + 1 };
    });
  };

  leftNav = () => {
    this.setState((prevState, nextProps) => {
      return { page: prevState.page - 1 };
    });
  };

  componentDidMount() {
    let data = { api_key: process.env.REACT_APP_TMDB_KEY };
    console.log(this.props);
    axiosTmdb
      .get(
        `/tv/${this.props.seriesId}/season/${
          this.props.match.params.seasonNumber
        }`,
        { params: data }
      )
      .then(resp => {
        console.log(resp);
        this.setState({ response: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  episodeChangeHandler = episode => {
    this.setState({ currentEpisode: episode });
  };

  render() {
    let tabs = null;
    let episodeInfo = null;
    if (this.state.response !== null) {
      tabs = this.state.response.episodes.map((item, i) => {
        return (
          <div
            className={
              this.state.currentEpisode === i
                ? [styles.tabWidth, styles.selectedTab].join(" ")
                : styles.tabWidth
            }
          >
            <p
              className={styles.tabs}
              onClick={() => this.episodeChangeHandler(i)}
            >
              {this.props.match.params.seasonNumber + "x" + (i + 1)}
            </p>
          </div>
        );
      });

      episodeInfo = (
        <React.Fragment>
          <div className={styles.wrapperClass}>
            <div
              className={styles.wrapperTabs}
              style={{
                transform: "translateX(" + -100 * this.state.page + "%" + ")"
              }}
            >
              {tabs}
            </div>
            <div className={styles.mainInfo}>
              <span className={styles.titleText}>
                {this.state.response.episodes[this.state.currentEpisode].name}
              </span>
              <span className={styles.dateText}>
                <i>{`(${
                  this.state.response.episodes[this.state.currentEpisode]
                    .air_date
                })`}</i>
              </span>
            </div>
            <div className={styles.imageOverview}>
              <img
                src={
                  "https://image.tmdb.org/t/p/w300/" +
                  this.state.response.episodes[this.state.currentEpisode]
                    .still_path
                }
                alt=""
              />
              <div className={styles.textInfo}>
                <span>
                  {this.state.response.episodes[this.state.currentEpisode]
                    .overview.length > 300
                    ? this.state.response.episodes[
                        this.state.currentEpisode
                      ].overview.substring(0, 300) + "... (Read More)"
                    : this.state.response.episodes[this.state.currentEpisode]
                        .overview}
                </span>
                <div className={styles.episodeRating}>
                  <RatingBar
                    rating={
                      this.state.response.episodes[this.state.currentEpisode]
                        .vote_average
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <NavigationButtonset
            leftNavFunction={this.leftNav}
            rightNavFunction={this.rightNav}
            visible={
              this.state.page >= this.state.response.episodes.length / 10 - 1
                ? "hidden"
                : "initial"
            }
            currentPosition={this.state.page}
          />
          <div className={styles.backButton}>
            <Button click={() => this.props.history.goBack()}>Seasons</Button>
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment>{episodeInfo}</React.Fragment>;
  }
}

export default EpisodeListInfo;
