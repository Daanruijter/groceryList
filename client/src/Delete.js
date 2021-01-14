import React from "react";
import "./Delete.css";
import axios from "axios";


export default class Delete extends React.Component {
  removeCheckId = () => {
    console.log("deleteid");

    let url = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/getidforcheck/removeid";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://blablablaapp.herokuapp.com/groceryitems/getidforcheck/removeid";
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
      .then((res) => {
        console.log(res);
        // this.fetchCheckIdArray();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  deleteItem = () => {
    this.removeCheckId();
    if (window.confirm("Are you sure you wish to delete this item?")) {
      let id = this.props.id;

      let url = "";

      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/groceryitems/deleteitem";
      }
      if (process.env.NODE_ENV === "production") {
        url =
          "https://blablablaapp.herokuapp.com/groceryitems/deleteitem";
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
