import React from "react";

export default class Kettle extends React.Component {
  constructor() {
    super();
    this.state = {
      isOn: false,
      temperature: 20,
      waterLevel: 0.5,
    };
  }

  togglePower() {
    this.setState((prevState) => ({
      isOn: !prevState.isOn,
    }));

    if (!this.state.isOn) {
      console.log("Чайник включен");
      this.boilWater();
    } else {
      console.log("Чайник выключен");
    }
  }

  boilWater() {
    setTimeout(() => {
      if (this.state.isOn) {
        this.setState({
          isOn: false,
        });
        console.log("Чайник вскипел");
      }
    }, 10000);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.togglePower()}>
          {this.state.isOn ? "Выключить" : "Включить"}
        </button>
        {this.state.isOn && <p>Температура: {this.state.temperature}</p>}
      </div>
    );
  }
}
