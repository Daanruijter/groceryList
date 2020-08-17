import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
  state = {
    userName: "",
    passWord: "",
  };

  handleChange = (e: any) => {
    if (e.target.name) this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    let registrationData = {
      userName: this.state.userName,
      passWord: this.state.passWord,
    };
    console.log(registrationData);
    this.setState({ userName: "", passWord: "" });
  };
  render() {
    return (
      <div className="login-wrapper">
        <form>
          <div className="login-username">
            <label>
              Username:&nbsp;&nbsp;
              <input
                onChange={this.handleChange}
                type="text"
                name="userName"
                placeholder="enter your full name"
              />
            </label>
          </div>
          <div className="login-password">
            <label>
              Password:&nbsp;&nbsp;
              <input
                onChange={this.handleChange}
                type="text"
                name="passWord"
                placeholder="enter a password"
              />
            </label>
          </div>
          <div className="login-submit">
            <input
              onClick={(e) => this.handleSubmit(e)}
              type="submit"
              name="submit"
              value="submit your data"
            />
          </div>
        </form>
      </div>
    );
  }
}
