import React from "react";
import Delete from "./Delete";
import Check from "./Check";
import Update from "./Update";

import "./GroceryStore.css";
import axios from "axios";


export default class GroceryStore extends React.Component {
 
  constructor(props) {
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
    updateArray: [],
    previousState: { updateArray: { id:"", path:"" } },
    updateIdForUpdateFieldToShow: "",
  };

  //clear updatearray when the grocerycomponent mounts
  componentDidMount() {

    //clear updateIdArray
    this.clearUpdateIdArray()

      //fetch the items
    this.fetchData();
  }


clearUpdateIdArray(){

    //clear updateArray
    console.log("componentdidmount");
    let url = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/deleteallidsfromupdateidarray";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://blablablaapp.herokuapp.com/groceryitems/deleteallidsfromupdateidarray";
    }

    const body = {};

    axios
      .post(url, body)
      .then((result) => {})

      .catch((err) => {
        console.log(err.response);
      });
}

clearCheckIdArray(){

   //clear checkIdArray
   console.log("componentdidmount");
   let url = "";

   if (process.env.NODE_ENV === "development") {
     url = "http://localhost:5000/groceryitems/deleteallidsfromcheckidarray";
   }
   if (process.env.NODE_ENV === "production") {
     url =
       "https://blablablaapp.herokuapp.com/groceryitems/deleteallidsfromcheckidarray";
   }

   const body = {};

   axios
     .post(url, body)
     .then((result) => {})

     .catch((err) => {
       console.log(err.response);
     });

}

  //removes the Update Component Id out of the MongoDB Component Id Array if it's already in it
  removeUpdateComponentIdFromArray(itemId) {
    let url = "";
    let id = itemId;
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/deleteidfromupdateidarray";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://blablablaapp.herokuapp.com/groceryitems/deleteidfromupdateidarray";
    }

    const body = {
      id,
    };

    axios
      .post(url, body)
      .then((result) => {
        this.getUpdateComponentIdArrayOnly(id);
        this.fetchData();
      })

      .catch((err) => {
        console.log(err.response);
      });
  }

  //set state with current/updated id array after a removing of sending an id
  getUpdateComponentIdArrayOnly(itemId) {
    let url = "";
    let id = itemId;

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/getupdatearray2";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://blablablaapp.herokuapp.com/groceryitems/getupdatearray2";
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
  getUpdateComponentIdArray(itemId, cback) {
    let url = "";
    let id = itemId;

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/getupdatearray";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://blablablaapp.herokuapp.com/groceryitems/getupdatearray";
    }

    const body = {id};

    axios
      .get(url, body)
      .then((res) => {
        let result = res;
        this.setState(
          { updateArray: result.data[0].updateIdsArray },
          () => {
            this.setState((prevState) => ({
              previousState: prevState,
            }));
            cback();
          }
        );
      })

      .catch((err) => {
        console.log(err.response);
      });
  }

  //sends the Id of the clicked Update Component update button to MongoDB
  sendUpdateComponentId(itemId) {
    let id = itemId;
    let url = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/sendupdateid";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://blablablaapp.herokuapp.com/groceryitems/sendupdateid";
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
        this.getUpdateComponentIdArrayOnly(id);
      })

      .catch((err) => {
        console.log(err.response);
      });
  }

  //Updates the item through the update button where the user clicks on
  updateItem = (itemId, e) => {
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
    let url = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems";
    }
    if (process.env.NODE_ENV === "production") {
      url = "https://blablablaapp.herokuapp.com/groceryitems";
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
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  deleteAll = () => {
    if (window.confirm("Are you sure you wish to delete all items?")) {
      let url = "";

      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/groceryitems/deleteall";
      }
      if (process.env.NODE_ENV === "production") {
        url =
          "https://blablablaapp.herokuapp.com/groceryitems/deleteall";
      }

      const body = {};

      axios
        .get(url, body)
        .then((res) => {
          this.fetchData();
          this.clearCheckIdArray();
          this.clearUpdateIdArray();
        })

        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  catchEnterEvent = (e) => {
    if (e.key === "Enter") {
      this.catchInput(e);
      if (null !== this.inputProductRef.current) {
        this.inputProductRef.current.focus();
      }
    }
  };

  catchInput = (e) => {
    if (this.state.product === "" || this.state.amount === "") {
      alert("please fill in product and amount fields!");
    } else {
      let groceryData = this.state;
      let product = groceryData.product;
      let amount = groceryData.amount;
      let information = groceryData.information;

      e.preventDefault();

      let url = "";

      if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/groceryitems";
      }
      if (process.env.NODE_ENV === "production") {
        url = "https://blablablaapp.herokuapp.com/groceryitems";
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

  catchUpdatedInput = (e) => {


    

    let groceryDataArray;
    groceryDataArray = this.state.groceryData;
    console.log(groceryDataArray[0]._id);
    let id = this.state.updateId;

    let currentItemData;

    currentItemData = groceryDataArray.filter((item) => {
      if (item._id === id) {
        return item;
      }
    });

    let groceryData = this.state;
    let productUpdated = groceryData.productUpdated;
    let amountUpdated = groceryData.amountUpdated;
    let informationUpdated = groceryData.informationUpdated;

    let currentProduct = currentItemData[0].product;
    let currentAmount = currentItemData[0].amount;
    let currentInformation = currentItemData[0].information;


  

    e.preventDefault();

    let url = "";

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/groceryitems/groceryitemsupdated";
    }
    if (process.env.NODE_ENV === "production") {
      url =
        "https://blablablaapp.herokuapp.com/groceryitems/groceryitemsupdated";
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
      currentProduct,
      currentAmount,
      currentInformation,
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

  addInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addUpdatedInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  compareUpdateIdArrays() {
    let currentUpdateIdsArray = this.state.updateArray;
    let previousUpdateIdsArray = this.state.previousState.updateArray;
    let length;
    let currentUpdateIdsArrayLength = currentUpdateIdsArray.length;
    let previousUpdateIdsArrayLength = previousUpdateIdsArray.length;
    if (
      currentUpdateIdsArrayLength !== undefined &&
      previousUpdateIdsArrayLength !== undefined
    ) {
      if (currentUpdateIdsArrayLength > previousUpdateIdsArrayLength) {
        let updateIdForUpdateFieldToShow =
          currentUpdateIdsArray[currentUpdateIdsArrayLength - 1];

        return updateIdForUpdateFieldToShow;
      }
      if (previousUpdateIdsArrayLength > currentUpdateIdsArrayLength) {
        length = previousUpdateIdsArrayLength;
      }

      if (length !== undefined) {
      }
    }
  }

  render() {
    let updateIdForUpdateFieldToShow;
    let currentUpdateIdsArray = this.state.updateArray;
    let previousUpdateIdsArray = this.state.previousState.updateArray;
    let length;
    let currentUpdateIdsArrayLength = currentUpdateIdsArray.length;
    let previousUpdateIdsArrayLength = previousUpdateIdsArray.length;

    
    if (
      currentUpdateIdsArrayLength !== undefined &&
      previousUpdateIdsArrayLength !== undefined
    ) {
      if (currentUpdateIdsArrayLength > previousUpdateIdsArrayLength) {
        updateIdForUpdateFieldToShow =
          currentUpdateIdsArray[currentUpdateIdsArrayLength - 1];
      }
    }

    let whichUpdateFieldToOpen;
    console.log(this.state.updateId);
    let id;
    id = this.state.updateId;

    if (
      this.state.updateArray.length !== undefined &&
      this.state.previousState.updateArray.length !== undefined &&
      this.state.updateArray.includes(id)
    ) {
      whichUpdateFieldToOpen = updateIdForUpdateFieldToShow;
 
    }


    let groceryData = this.state.groceryData;

    let itemToDisplay = groceryData.map((item) => {
      return (
        <div className="grocerystore-positioner" key={item._id}>
    
          {whichUpdateFieldToOpen === item._id ? (
            <div className="grocerystore-horizontal-line-updateopen">
              <hr />
            </div>
          ) : (
            <div className="grocerystore-horizontal-line-updateclosed">
              <hr />
            </div>
          )}
          <div className="grocerystore-product-data">{item.product}</div>{" "}
        
          {whichUpdateFieldToOpen === item._id ? (
            <div className="grocerystore-product-update">
              <input
                name="productUpdated"
                onChange={(e) => this.addUpdatedInput(e)}
                type="text"
                placeholder="type the product here"
                required
                value={this.state.productUpdated}
                ref={this.inputProductRef}
              ></input>
            </div>
          ) : null}
          <div className="grocerystore-amount-data">{item.amount}</div>
          {whichUpdateFieldToOpen === item._id ? (
            <div className="grocerystore-amount-update">
              <input
                name="amountUpdated"
                onChange={(e) => this.addUpdatedInput(e)}
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

          {whichUpdateFieldToOpen === item._id ? (
            <div className="grocerystore-information-update">
              <input
                name="informationUpdated"
                onChange={(e) => this.addUpdatedInput(e)}
                type="text"
                placeholder="type the information here"
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
              onChange={(e) => this.addInput(e)}
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
              onChange={(e) => this.addInput(e)}
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
              onChange={(e) => this.addInput(e)}
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
