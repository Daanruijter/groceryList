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
    productUpdated: "",
    amountUpdated: "",
    informationUpdated: "",
    groceryDataUpdated: [],
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
        this.getUpdateComponendIdArrayOnly(id);
        this.fetchData();
      })

      .catch((err) => {
        console.log(err.response);
      });
  }

  //set state with current/updated id array after a removing of sending an id
  getUpdateComponendIdArrayOnly(itemId: any) {
    let url: string = "";
    let id = itemId;

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/getupdatearray2";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/getupdatearray2";
    }

    const body = {};

    axios
      .get(url, body)
      .then((res) => {
        let result = res;

        this.setState({ updateArray: result.data[0].updateIdsArray }, () => {});
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
            cback();
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

    axios
      .post(url, body, config)
      .then((result) => {
        this.getUpdateComponendIdArrayOnly(id);
      })

      .catch((err) => {
        console.log(err.response);
      });
  }

  //Updates the item through the update button where the user clicks on
  updateItem = (itemId: any, e: any) => {
    let id = itemId;
    this.setState({ updateId: id });

    this.getUpdateComponentIdArray(id, () => {
      if (this.state.updateArray.includes(id)) {
        console.log("includes id, so remove it");
        this.removeUpdateComponentIdFromArray(id);
        this.catchUpdatedInput(e);
      }
      if (!this.state.updateArray.includes(id)) {
        this.sendUpdateComponentId(id);
        console.log("excludes id, so add it");
      }
    });
  };

  clearState = () => {
    this.setState({
      product: "",
      amount: "",
      information: "",
    });
  };

  clearStateUpdated = () => {
    this.setState({
      productUpdated: "",
      amountUpdated: "",
      informationUpdated: "",
    });
  };

  triggerFetchData = () => {
    this.fetchData();
  };

  fetchData() {
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

  catchUpdatedInput = (e: any) => {
    // if (this.state.productUpdated === "" || this.state.amountUpdated === "") {
    //   alert("please fill in product and amount fields!");
    // } else {

    console.log(this.state.groceryData);

    let groceryDataArray: String[] = [];
    groceryDataArray = this.state.groceryData;

    let id = this.state.updateId;

    let test = groceryDataArray.filter((item: any) => {
      if (item._id === id) {
        return item;
      }
    });
    //trying to get the data with the current id//
    console.log(test[0]);
    // console.log(groceryDataArray);
    // if (!groceryDataArray.includes(id)) {
    //   console.log(id);
    // }

    let groceryData = this.state;
    let productUpdated = groceryData.productUpdated;
    let amountUpdated = groceryData.amountUpdated;
    let informationUpdated = groceryData.informationUpdated;
    e.preventDefault();

    let url: string = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/groceryitemsupdated";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://myitinerariestravelapp.herokuapp.com/groceryitems/groceryitemsupdated";
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      id,
      productUpdated,
      amountUpdated,
      informationUpdated,
    });

    axios
      .post(url, body, config)
      .then((res) => {
        this.fetchData();
        this.clearStateUpdated();
      })

      .catch((err) => {
        console.log(err.response);
      });
    // }
    if (null !== this.inputProductRef.current) {
      this.inputProductRef.current.focus();
    }
  };

  addInput = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addUpdatedInput = (e: any) => {
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
          {this.state.updateArray.includes(item._id) ? (
            <div className="grocerystore-product-update">
              <input
                name="productUpdated"
                onChange={(e: any) => this.addUpdatedInput(e)}
                type="text"
                placeholder="type the product here"
                required
                value={this.state.productUpdated}
                ref={this.inputProductRef}
              ></input>
            </div>
          ) : null}
          <div className="grocerystore-amount-data">{item.amount}</div>
          {this.state.updateArray.includes(item._id) ? (
            <div className="grocerystore-amount-update">
              <input
                name="amountUpdated"
                onChange={(e: any) => this.addUpdatedInput(e)}
                type="text"
                placeholder="type the amount here"
                required
                value={this.state.amountUpdated}
              ></input>
            </div>
          ) : null}
          <div className="grocerystore-information-data">
            {item.information}
          </div>{" "}
          {this.state.updateArray.includes(item._id) ? (
            <div className="grocerystore-information-update">
              <input
                name="informationUpdated"
                onChange={(e: any) => this.addUpdatedInput(e)}
                type="text"
                placeholder="type the amount here"
                required
                value={this.state.informationUpdated}
              ></input>
            </div>
          ) : null}
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
