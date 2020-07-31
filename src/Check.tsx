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

  changeCheckItemColor = () => {
    let currentId = this.props.id;
    let idArray = this.state.checkIdArray;

    if (idArray.includes(currentId)) {
      this.removeCheckId();
    } else {
      this.addCheckId();
    }
  };

  //remove an ID if it already exists in the array and the user hits the check button
  removeCheckId = () => {
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
        this.fetchCheckIdArray();
      })
      .catch((err: any) => {
        console.log(err.response.data);
      });
  };

  //fetch the array of checked grocery item ids
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

        this.setState({ checkIdArray: ids[0].checkIdArray });
      })
      .catch((error) => {
        const errorMessage: String = error.message;
        console.log(errorMessage);
      });
  }

  //when a user checks a grocery item and if it's ID is not in the array, add the ID
  addCheckId = () => {
    let id = this.props.id;
    let checkIdArray = this.state.checkIdArray;

    if (checkIdArray.includes(id)) {
      console.log("includes id");
    }

    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/pushidforcheck";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/pushidforcheck";
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
        this.fetchCheckIdArray();
      })

      .catch((err) => {
        console.log(err.response);
      });

    // }
    // }
  };
  render() {
    let currentId = this.props.id;
    let idArray = this.state.checkIdArray;
    return (
      <div onClick={this.changeCheckItemColor}>
        {idArray.includes(currentId) ? (
          <div className="check-green">V</div>
        ) : (
          <div className="check-red">V</div>
        )}
      </div>
    );
  }
}
