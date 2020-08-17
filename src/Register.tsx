import React, { Component } from "react";
import "./Register.css";

export default class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    passWord: "",
  };
  handleChange = (e: any) => {
    if (e.target.name) this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    let registrationData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      passWord: this.state.passWord,
    };
    console.log(registrationData);
    this.setState({ firstName: "", lastName: "", passWord: "" });
  };
  render() {
    return (
      <div className="register-wrapper">
        <form>
          <div className="register-firstname">
            <label>
              First Name:&nbsp;&nbsp;
              <input
                onChange={(e) => this.handleChange(e)}
                type="text"
                name="firstName"
                placeholder="enter your first name"
              />
            </label>
          </div>
          <div className="register-lastname">
            <label>
              {" "}
              Last Name:&nbsp;&nbsp;
              <input
                onChange={(e) => this.handleChange(e)}
                type="text"
                name="lastName"
                placeholder="enter your last name"
              />
            </label>
          </div>
          <div className="register-password">
            <label>
              Password:&nbsp;&nbsp;
              <input
                onChange={(e) => this.handleChange(e)}
                type="text"
                name="passWord"
                placeholder="enter a password"
              />
            </label>
            <div className="register-submit">
              <input
                onClick={(e) => this.handleSubmit(e)}
                type="submit"
                name="submit"
                value="submit your data"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
