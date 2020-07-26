import React from "react";
import "./Delete.css";
import axios from "axios";

interface props {
  id: string;
  triggerFetchdata: () => void;
}

export default class Delete extends React.Component<props> {
  removeCheckId = () => {
    console.log("deleteid");

    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/getidforcheck/removeid";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/getidforcheck/removeid";
    }

    let id = this.props.id;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      id,
    });

    axios
      .post(url, body, config)
      .then((res: any) => {
        console.log(res);
        // this.fetchCheckIdArray();
      })
      .catch((err: any) => {
        console.log(err.response.data);
      });
  };

  deleteItem = () => {
    this.removeCheckId();
    if (window.confirm("Are you sure you wish to delete this item?")) {
      let id = this.props.id;

      let url: string = "";

      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/groceryitems/deleteitem";
      }
      if (process.env.NODE_ENV === "production") {
        url =
          "https://myitinerariestravelapp.herokuapp.com/groceryitems/deleteitem";
      }

      const body = {
        id,
      };

      axios
        .post(url, body)
        .then((res) => {
          console.log(res);
          this.props.triggerFetchdata();
        })

        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  render() {
    return (
      <div onClick={this.deleteItem} className="delete">
        X
      </div>
    );
  }
}
