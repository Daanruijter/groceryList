import React from "react";
import "./Delete.css";
import axios from "axios";

interface props {
  id: string;
  fetchData: any;
  // fetchData: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default class Delete extends React.Component<props> {
  deleteItem = () => {
    let id = this.props.id;

    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/deleteitem";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/deleteitem";
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      id,
    };

    axios
      .post(url, body)
      .then((res) => {
        console.log(res);
        this.props.fetchData();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  render() {
    return (
      <div onClick={this.deleteItem} className="delete">
        X
      </div>
    );
  }
}
