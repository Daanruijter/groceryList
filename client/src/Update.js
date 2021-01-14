import React from "react";
import "./Update.css";

export default class Update extends React.Component {
  state = {
    updateOpen: false,
  };

  callUpdate = (e) => {
    let id = this.props.id;
    this.props.updateItem(id, e);
  };

  render() {
    return (
      <div className="update-button" onClick={(e) => this.callUpdate(e)}>
        update
      </div>
    );
  }
}
