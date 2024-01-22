import React from "react";
import Kettle from "./components/Kettle";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Электрический чайник</h1>
        <Kettle />
      </div>
    );
  }
}

export default App;
