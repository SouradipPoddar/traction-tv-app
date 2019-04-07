import React, { Component } from "react";
import styles from "./SeasonInfo.module.css";
import NavigationButtonset from "../../components/UI/NavigationButtonset/NavigationButtonset";
import { Link } from "react-router-dom";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

class SeasonInfo extends Component {
  state = {
    currentPosition: 0,
    currentSeries: null
  };

  rightNav = () => {
    this.setState((prevState, nextProps) => {
      return { currentPosition: prevState.currentPosition + 1 };
    });
  };

  leftNav = () => {
    this.setState((prevState, nextProps) => {
      return { currentPosition: prevState.currentPosition - 1 };
    });
  };

  componentDidUpdate() {
    if (this.props.match.params.id !== this.state.currentSeries) {
      this.setState({
        currentPosition: 0,
        currentSeries: this.props.match.params.id
      });
    }
    console.log(this.props);
  }

  componentDidMount() {
    this.setState({
      currentPosition: 0,
      currentSeries: this.props.match.params.id
    });
  }

  render() {
    let seasonList = null;
    if (
      this.props.seasonInfo !== null &&
      this.props.seasonInfo !== undefined &&
      this.props.seasonInfo.length > 0
    ) {
      seasonList = this.props.seasonInfo.map((item, i) => {
        return (
          <div className={styles.singleSeason} key={i}>
            <Link
              to={this.props.match.url + "/seasons/" + item.season_number}
              style={{ textDecoration: "none" }}
            >
              <img
                className={styles.poster}
                src={"https://image.tmdb.org/t/p/w154/" + item.poster_path}
                alt=""
              />
              <span className={styles.seasonNameText}>{item.name}</span>
            </Link>
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        {" "}
        <div className={styles.seasonTab}>
          <div
            className={styles.innerDiv}
            style={{
              transform:
                "translateX(" + -101.5 * this.state.currentPosition + "%" + ")"
            }}
          >
            {seasonList}
          </div>
        </div>
        <NavigationButtonset
          leftNavFunction={this.leftNav}
          rightNavFunction={this.rightNav}
          visible={
            this.state.currentPosition >= this.props.seasonInfo.length / 5 - 1
              ? "hidden"
              : "initial"
          }
          currentPosition={this.state.currentPosition}
        />
      </React.Fragment>
    );
  }
}

export default SeasonInfo;
