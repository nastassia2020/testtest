import React from "react";
import Kettle from "./components/Kettle";
import "./App.css";
import Vitek from "./img/kettle.png";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Электрический чайник</h1>
        <img src={Vitek} alt="Kettle" />
        <Kettle />
      </div>
    );
  }
}

export default App;
