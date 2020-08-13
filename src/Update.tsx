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

  callUpdate = (e: any) => {
    let id = this.props.id;
    this.props.updateItem(id, e);
  };

  render() {
    return (
      <div className="update-button" onClick={(e: any) => this.callUpdate(e)}>
        update
      </div>
    );
  }
}
