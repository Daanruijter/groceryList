import React, { Component } from "react";
// import Register from "./Register";
import "./Menu.css";
import Login from "./Login";
import Register from "./Register";


export default class Menu extends React.Component
  {
  state = {
    loginDivOpen: false,
    registerDivOpen: false,
  };

  toggleLoginDiv = () => {
  
    // this.props.test(test1);
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


//   mapStateToProps = (state: any) => {
//     return {
//       state: state,
//     };
//   };
//   //fires actions to Redux (in this case the fetchfunction)//
//   mapDispatchToProps = (dispatch: any) => {
//     return { test: () => dispatch(test()) };
//   };
// }
// export default connect<StateFromProps, DispatchFromProps, void>(
//   mapStateToProps,
//   mapDispatchToProps
// )(Menu);
