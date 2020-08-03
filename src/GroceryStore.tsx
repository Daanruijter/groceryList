import React from "react";
// import { map } from "rxjs/operators";
import Delete from "./Delete";
import Check from "./Check";
import Update from "./Update";
import "./GroceryStore.css";
import axios from "axios";

interface props {
  inputProductRef?: HTMLInputElement;
}

export default class GroceryStore extends React.Component<props> {
  private inputProductRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.inputProductRef = React.createRef();
  }

  state = {
    product: "",
    amount: "",
    information: "",
    groceryData: [],
    updateOpen: false,
    updateId: "",
    updateArray: Array<{ id: string; path: string }>(),
  };

  //clear updatearray when the grocerycomponent mounts
  componentDidMount() {
    console.log("componentdidmount");
    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/deleteallidsfromupdateidarray";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/deleteallidsfromupdateidarray";
    }

    const body = {};

    axios
      .post(url, body)
      .then((result) => {})

      .catch((err) => {
        console.log(err.response);
      });

    this.fetchData();
  }

  //removes the Update Component Id out of the MongoDB Component Id Array if it's already in it
  removeUpdateComponentIdFromArray(itemId: any) {
    let url: string = "";
    let id = itemId;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/deleteidfromupdateidarray";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/deleteidfromupdateidarray";
    }

    const body = {
      id,
    };

    axios
      .post(url, body)
      .then((result) => {
        console.log(result, "resultttttttt");

        this.fetchData();
        // this.setState({ updateArray: result.data[0].updateIdsArray });
      })

      .catch((err) => {
        console.log(err.response);
      });
  }

  //fetches the Update Component Id Array out of MongoDB
  getUpdateComponentIdArray(itemId: any, cback: any) {
    let url: string = "";
    let id = itemId;

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/getupdatearray";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/getupdatearray";
    }

    const body = {};

    axios
      .get(url, body)
      .then((res) => {
        let result = res;
        this.setState(
          { updateArray: result.data[0].updateIdsArray },
          () => {
            console.log("callback in setState");

            cback();
            console.log(this.state.updateArray);
          }

          // }
          // );
        );
      })

      .catch((err) => {
        console.log(err.response);
      });
  }

  //sends the Id of the clicked Update Component update button to MongoDB
  sendUpdateComponentId(itemId: any) {
    let id = itemId;
    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/sendupdateid";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/sendupdateid";
    }

    //send id of update component to array in Mongo//
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      id,
    });

    console.log(url);

    axios
      .post(url, body, config)
      .then((result) => {
        this.setState({ updateArray: result.data[0].updateIdsArray });
      })

      .catch((err) => {
        console.log(err.response);
      });
  }

  //Updates the item through the update button where the user clicks on
  updateItem = (itemId: any) => {
    let id = itemId;
    this.getUpdateComponentIdArray(id, () => {
      console.log(this.state.updateArray.includes(id), "includes or excludes");
      console.log(this.state.updateArray);

      if (this.state.updateArray.includes(id)) {
        console.log("includes id, so remove it");
        this.removeUpdateComponentIdFromArray(id);
      }
      if (!this.state.updateArray.includes(id)) {
        this.sendUpdateComponentId(id);
        console.log("excludes id, so add it");
      }
    });

    //     console.log("ajax"););

    // () => {
    //   console.log(this.state.updateArray);
    //   if (this.state.updateArray.includes(id)) {
    //     console.log("includes id");
    //     this.removeUpdateComponentIdFromArray(id);
    //   }
    //   if (!this.state.updateArray.includes(id)) {
    //     this.sendUpdateComponentId(id);
    //   }
    // }

    // this.setState({
    //   updateOpen: !this.state.updateOpen,
    //   updateId: itemId,
    //   // updateArray: updateArrayPushContent,
    // });
    // this.getUpdateComponentIdArray(id);

    // if (this.state.updateArray.length === 0) {
    //   setTimeout(() => {
    //     if (this.state.updateArray.includes(id)) {
    //       this.removeUpdateComponentIdFromArray(id);

    //       console.log("erin en verwijder de id");
    //     } else {
    //       this.sendUpdateComponentId(id);

    //       console.log("eruit en stop de id erin");
    //     }
    //   }, 800);

    // if (this.state.updateArray.includes(id)) {
    //   this.removeUpdateComponentIdFromArray(id);
    //   this.getUpdateComponentIdArray(id);
    //   console.log("erin en verwijder de id");
    // } else {
    //   this.sendUpdateComponentId(id);

    //   console.log("eruit en stop de id erin");
    // }

    // console.log(itemId);
    // console.log("exectuedddd");
    // let updateArrayPushContent = [];
    // updateArrayPushContent.push(itemId);

    // localStorage.setItem("test", `${updateArrayPushContent}`);

    // console.log(updateArrayPushContent);
    // if (this.state.updateId === itemId) {

    // }
  };

  clearState = () => {
    this.setState({
      product: "",
      amount: "",
      information: "",
    });
  };

  triggerFetchData = () => {
    console.log("triggerfetchdata");
    this.fetchData();
  };

  fetchData() {
    console.log("fecthdata");
    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems";
    }
    if (process.env.NODE_ENV === "production") {
      url = "https://myitinerariestravelapp.herokuapp.com/groceryitems";
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
        const groceryData = data;
        this.setState({ groceryData: groceryData });
        // console.log(groceryData, "data fetched");
      })
      .catch((error) => {
        const errorMessage: String = error.message;
        console.log(errorMessage);
      });
  }

  deleteAll = () => {
    if (window.confirm("Are you sure you wish to delete all items?")) {
      let url: string = "";

      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/groceryitems/deleteall";
      }
      if (process.env.NODE_ENV === "production") {
        url =
          "https://myitinerariestravelapp.herokuapp.com/groceryitems/deleteall";
      }

      const body = {};

      axios
        .get(url, body)
        .then((res) => {
          console.log(res);
          this.fetchData();
        })

        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  catchEnterEvent = (e: any) => {
    if (e.key === "Enter") {
      this.catchInput(e);
      if (null !== this.inputProductRef.current) {
        this.inputProductRef.current.focus();
      }
    }
  };

  catchInput = (e: any) => {
    if (this.state.product === "" || this.state.amount === "") {
      alert("please fill in product and amount fields!");
    } else {
      let groceryData = this.state;
      let product = groceryData.product;
      let amount = groceryData.amount;
      let information = groceryData.information;

      e.preventDefault();

      let url: string = "";

      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/groceryitems";
      }
      if (process.env.NODE_ENV === "production") {
        url = "https://myitinerariestravelapp.herokuapp.com/groceryitems";
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        product,
        amount,
        information,
      });

      axios
        .post(url, body, config)
        .then((res) => {
          this.fetchData();
          this.clearState();
        })

        .catch((err) => {
          console.log(err.response);
        });
    }
    if (null !== this.inputProductRef.current) {
      this.inputProductRef.current.focus();
    }
  };

  addInput = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let groceryData: any = this.state.groceryData;

    let itemToDisplay = groceryData.map((item: any) => {
      return (
        <div className="grocerystore-positioner" key={item._id}>
          <div className="grocerystore-product-data">{item.product}</div>{" "}
          {/* {this.state.updateOpen ? ( */}
          {item._id === this.state.updateId ? (
            <div className="grocerystore-product-update">
              <input></input>
            </div>
          ) : // ) : null
          null}
          <div className="grocerystore-amount-data">{item.amount}</div>
          {/* {this.state.updateOpen ? ( */}
          {item._id === this.state.updateId ? (
            <div className="grocerystore-amount-update">
              <input></input>
            </div>
          ) : // ) : null
          null}
          <div className="grocerystore-information-data">
            {item.information}
          </div>{" "}
          {/* {this.state.updateOpen ? ( */}
          {item._id === this.state.updateId ? (
            <div className="grocerystore-information-update">
              <input></input>
            </div>
          ) : // ) : null
          null}
          <div className="grocerystore-delete">
            <Delete id={item._id} triggerFetchdata={this.triggerFetchData} />
          </div>
          <div className="grocerystore-check">
            <Check id={item._id} />
          </div>
          <div className="grocerystore-update">
            <Update updateItem={this.updateItem} id={item._id} />
          </div>
        </div>
      );
    });

    return (
      <div className="grocerystore-wrapper">
        <div className="grocerystore-grid">
          <div onClick={this.catchInput} className="grocerystore-add-item">
            Add Item
          </div>
          <div className="grocerystore-product  grocerystore-header">
            Product
          </div>
          <div className="grocerystore-product-input">
            <input
              name="product"
              onChange={(e: any) => this.addInput(e)}
              type="text"
              placeholder="type the product here"
              required
              value={this.state.product}
              ref={this.inputProductRef}
            />
          </div>
          <div className="grocerystore-amount  grocerystore-header">Amount</div>
          <div className="grocerystore-amount-input">
            <input
              name="amount"
              onChange={(e: any) => this.addInput(e)}
              type="text"
              placeholder="type the amount here"
              required
              value={this.state.amount}
            />
          </div>
          <div className="grocerystore-extra-info  grocerystore-header">
            Extra info
          </div>
          <div className="grocerystore-extra-info-input">
            <input
              name="information"
              onChange={(e: any) => this.addInput(e)}
              onKeyDown={this.catchEnterEvent}
              type="text"
              placeholder="type extra info here"
              required
              value={this.state.information}
            />
          </div>
          <div className="grocerystore-positioner ">{itemToDisplay}</div>
          <div onClick={this.deleteAll} className="grocerystore-delete-all">
            Delete all
          </div>
        </div>
      </div>
    );
  }
}
