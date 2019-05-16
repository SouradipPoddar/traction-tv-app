import React, { PureComponent } from "react";
import styles from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import axios from "axios";
import * as actions from "../../store/actions/authActions";
import { connect } from "react-redux";

class Auth extends PureComponent {
  state = {
    login: "",
    password: "",
    signUpState: true
  };

  emailChangeHandler = event => {
    this.setState({ login: event.target.value });
  };

  pwChangeHandler = event => {
    this.setState({ password: event.target.value });
  };

  toggleSignUpState = () => {
    this.setState((prevState, nextProps) => {
      return { signUpState: !prevState.signUpState };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={styles.errorWrapper}
          style={{ visibility: this.props.error ? "visible" : "hidden" }}
        >
          <span className={styles.error}>
            {this.props.error ? this.props.error : "G"}
          </span>
        </div>
        <div className={styles.loginWrapper}>
          <h2 className={styles.header}>
            {this.state.signUpState ? "SIGN UP" : "SIGN IN"}
          </h2>
          <input
            className={styles.input}
            value={this.state.login}
            onChange={this.emailChangeHandler}
            placeholder="Email Id"
          />
          <input
            className={styles.input}
            value={this.state.password}
            onChange={this.pwChangeHandler}
            type="password"
            placeholder="Password"
          />
          <div className={styles.loginButton}>
            <Button
              click={() =>
                this.props.signUp(
                  this.state.login,
                  this.state.password,
                  this.state.signUpState,
                  this.props.history,
                  this.props.location
                )
              }
            >
              {`${this.state.signUpState ? "SIGN UP" : "SIGN IN"}`}
            </Button>
          </div>
          <span className={styles.signInNote} onClick={this.toggleSignUpState}>
            {`${
              this.state.signUpState
                ? "Already a User? Sign In"
                : "New User? Register"
            } instead.`}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.userId,
    token: state.auth.token,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (userId, password, signUp, history, fromTrue) =>
      dispatch(actions.signUp(userId, password, signUp, history, fromTrue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
