import React from "react";
import "./Check.css";
import axios from "axios";

interface props {
  id: string;
}

export default class Check extends React.Component<props> {
  state = { checkIdArray: "" };

  componentDidMount() {
    this.fetchCheckIdArray();
  }

  removeId = () => {
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
      })
      .catch((err: any) => {
        console.log(err.response.data);
      });
  };

  fetchCheckIdArray() {
    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/getidforcheck";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/getidforcheck";
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const ids = data;
        console.log(ids, "data fetched from check");
        this.setState({ checkIdArray: ids[0].checkIdArray });
      })
      .catch((error) => {
        const errorMessage: String = error.message;
        console.log(errorMessage);
      });
  }

  sendCheckId = () => {
    let id = this.props.id;
    // let checkIdArray;
    // if (checkIdArray === "" || checkIdArray === "") {
    // let checkIdArray = this.state.checkIdArray;

    this.fetchCheckIdArray();
    // if (checkIdArray.includes(id)) {
    console.log("includes id");
    // this.removeId();
    // } else {
    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/getidforcheck";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/getidforcheck";
    }
    let headers = {};
    const body = {
      id,
    };

    axios
      .post(url, body, {
        headers,
      })
      .then((res) => {
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err.response);
      });

    console.log("excludes id");
    // }
    // }
  };
  render() {
    return <div onClick={this.sendCheckId}>V</div>;
  }
}
