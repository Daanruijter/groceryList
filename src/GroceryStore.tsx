import React, { Component } from "react";
// import Delete from "./Delete";
import "./GroceryStore.css";

export default class GroceryStore extends Component {
  state = { product: "", amount: "", information: "" };

  catchInput = (e: any) => {
    if (
      this.state.product === "" ||
      this.state.amount === "" ||
      this.state.information === ""
    ) {
      alert("please fill in all fields!");
    } else {
      console.log(this.state);
    }
  };

  addInput = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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
            />
          </div>
          <div className="grocerystore-extra-info  grocerystore-header">
            Extra info
          </div>
          <div className="grocerystore-extra-info-input">
            <input
              name="information"
              onChange={(e: any) => this.addInput(e)}
              type="text"
              placeholder="type extra info here"
              required
            />
          </div>
          <div className="grocerystore-list-wrapper"></div>
          <div className="grocerystore-delete-all">Delete all</div>

          {/* <div className="grocerystore-items-container">
            <div className="grocerystore-add-item">Add Item</div>
            <br />
            <div className="grocerystore-header">Item</div>
            <div>Oranges</div>
          </div>
          <div className="grocerystore-delete-container">
            <br />
            <br />
            <div className="grocerystore-header"></div>
            <Delete />
          </div>
          <div className="grocerystore-amount-container">
            <br />
            <br />
            <div className="grocerystore-header">Amount</div>
            <div>5</div>
          </div>
          <div className="grocerystore-delete-container">
            <br />
            <br />
            <div className="grocerystore-header"></div>
            <Delete />
          </div>
          <div>Add an item</div> */}
        </div>
      </div>
    );
  }
}
