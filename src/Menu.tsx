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
    this.setState({ loginDivOpen: !this.state.loginDivOpen });
  };
  toggleRegisterDiv = () => {
    this.setState({ registerDivOpen: !this.state.registerDivOpen });
  };
  render() {
    return (
      <div className="menu-wrapper">
        <div onClick={this.toggleLoginDiv} className="menu-login">
          Login {this.state.loginDivOpen ? <div>logindivopen</div> : null}
        </div>
        <div onClick={this.toggleRegisterDiv} className="menu-register">
          Register
          {this.state.registerDivOpen ? <div>registerdivopen</div> : null}
        </div>
      </div>
    );
  }
}
