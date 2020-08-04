import React from "react";
import "./Update.css";

interface props {
  updateItem: (itemId: any, e: any) => void;
  id: String;
}

export default class Update extends React.Component<props> {
  state = {
    updateOpen: false,
  };

  // sendIdOrNot = () => {
  //   let id = this.props.id;
  //   if (this.state.updateOpen) {
  //     this.props.updateItem(id);
  //   }
  //   if (!this.state.updateOpen) {
  //     this.props.updateItem("sdsd");
  //   }
  // };

  // callUpdate = () => {
  //   this.setState({ updateOpen: !this.state.updateOpen }, () => {
  //     this.sendIdOrNot();
  //   });
  // };

  callUpdate = (e: any) => {
    let id = this.props.id;
    // this.setState({ updateOpen: !this.state.updateOpen }, () => {
    this.props.updateItem(id, e);
    // });
  };

  render() {
    return <div onClick={(e: any) => this.callUpdate(e)}>update</div>;
  }
}
