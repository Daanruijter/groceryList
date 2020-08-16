import React from "react";
import "./App.css";
import GroceryStore from "./GroceryStore";
import Menu from "./Menu";

function App() {
  return (
    <div className="App">
      <Menu />
      <GroceryStore />
    </div>
  );
}

export default App;
