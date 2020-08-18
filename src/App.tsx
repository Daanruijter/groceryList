import React from "react";
import "./App.css";
import GroceryStore from "./GroceryStore";
import Menu from "./Menu";
import { connect } from "react-redux";

function App() {
  return (
    <div className="App">
      <Menu />
      <GroceryStore />
    </div>
  );
}
console.log(connect);
export default connect(App);
