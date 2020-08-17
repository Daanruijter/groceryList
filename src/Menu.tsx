import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import "./Menu.css";

interface registrationAndAuthenticationDivs {
  loginDivOpen: boolean;
  registerDivOpen: boolean;
}

export default class Menu extends React.Component<
  {},
  registrationAndAuthenticationDivs
> {
  state = {
    loginDivOpen: false,
    registerDivOpen: false,
  };
  toggleLoginDiv = () => {
    this.setState({ loginDivOpen: !this.state.loginDivOpen }, () => {
      if (this.state.loginDivOpen) {
        this.setState({ registerDivOpen: !this.state.loginDivOpen });
      }
    });
  };
  toggleRegisterDiv = () => {
    this.setState({ registerDivOpen: !this.state.registerDivOpen }, () => {
      if (this.state.loginDivOpen) {
        this.setState({ loginDivOpen: !this.state.loginDivOpen });
      }
    });
  };

  render() {
    return (
      <div className="menu-wrapper">
        <div onClick={this.toggleLoginDiv} className="menu-login">
          Login{" "}
        </div>
        <div onClick={this.toggleRegisterDiv} className="menu-register">
          Register
        </div>
        {this.state.loginDivOpen ? (
          <div>
            <Login />
          </div>
        ) : null}
        {this.state.registerDivOpen ? (
          <div>
            <Register />
          </div>
        ) : null}
      </div>
    );
  }
}
