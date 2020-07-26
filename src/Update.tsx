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

  callUpdate = () => {
    let id = this.props.id;

    this.props.updateItem(id);
  };

  render() {
    return <div onClick={this.callUpdate}>update</div>;
  }
}
