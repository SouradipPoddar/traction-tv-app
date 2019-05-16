import React from "react";
import styles from "./SearchBar.module.css";
import Suggestions from "./Suggestions/Suggestions";
import { Link, withRouter } from "react-router-dom";

const SearchBar = props => (
  <div className={styles.Toolbar}>
    <div className={styles.wrapperDiv}>
      <input
        className={styles.searchPanel}
        spellCheck="false"
        placeholder="Search TV Shows..."
        onChange={props.changeValue}
        onFocus={props.focusFunc}
      />
      <div className={styles.searchButton}>
        <i className={["fas fa-search fa-sm", styles.faSearch].join(" ")} />
      </div>
      <div className={styles.loginButton}>
        {props.userId ? (
          <div className={styles.profileButton}>
            {props.userId.toUpperCase()}
          </div>
        ) : (
          <Link
            to={{
              pathname: "/login",
              state: { prevPath: props.location.pathname }
            }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>Login/Sign Up</span>
          </Link>
        )}
      </div>
    </div>
    <Suggestions
      suggestionsList={props.suggestions}
      showState={props.show}
      backdropClick={props.focusFunc}
    />
  </div>
);

export default withRouter(SearchBar);
