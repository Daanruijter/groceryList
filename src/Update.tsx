import React from "react";
import "./Update.css";

interface props {
  updateItem: (itemId: any) => void;
  id: String;
}

export default class Update extends React.Component<props> {
  state = {
    updateOpen: false,
  };

  sendIdOrNot = () => {
    let id = this.props.id;
    if (this.state.updateOpen) {
      this.props.updateItem(id);
    }
    if (!this.state.updateOpen) {
      this.props.updateItem("sdsd");
    }
  };

  // callUpdate = () => {
  //   this.setState({ updateOpen: !this.state.updateOpen }, () => {
  //     this.sendIdOrNot();
  //   });
  // };

  callUpdate = () => {
    let id = this.props.id;
    this.setState({ updateOpen: !this.state.updateOpen }, () => {
      this.props.updateItem(id);
    });
  };

  render() {
    return <div onClick={this.callUpdate}>update</div>;
  }
}
