import React, { Component } from "react";
import Delete from "./Delete";
import "./GroceryStore.css";

export default class GroceryStore extends Component {
  render() {
    let test: String = "test";
    return (
      <div className="grocerystore-wrapper">
        <div className="grocerystore-grid">
          <div className="grocerystore-add-item">Add Item</div>
          <div className="grocerystore-product-input">Product</div>

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
