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
    const interval = setInterval(() => {
      if (this.state.isOn && this.state.temperature < 100) {
        this.setState((prevState) => ({
          temperature: prevState.temperature + 10,
        }));
      } else {
        clearInterval(interval);
        if (this.state.isOn) {
          this.setState({
            isOn: false,
          });
          console.log("Чайник вскипел");
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleWaterLevelChange(event) {
    const waterLevel = parseFloat(event.target.value);
    if (waterLevel >= 0 && waterLevel <= 1.0) {
      this.setState({
        waterLevel: waterLevel,
      });
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.togglePower()}
          disabled={this.state.waterLevel === 0}
        >
          {this.state.isOn ? "Выключить" : "Включить"}
        </button>
        <p>Количество воды: {this.state.waterLevel}</p>
        <input
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={this.state.waterLevel}
          onChange={(event) => this.handleWaterLevelChange(event)}
        />
        {this.state.waterLevel === 0 && <p>Чайник пуст! Добавьте воду.</p>}
        <p>Время закипания: 10 секунд</p>
        {!this.state.isOn &&
          this.state.temperature !== 20 &&
          this.state.temperature < 100 && <p>Чайник остановлен!</p>}
        {this.state.temperature < 100 && (
          <p>Температура: {this.state.temperature}</p>
        )}
        {this.state.temperature === 100 && <p>Чайник вскипел!</p>}
      </div>
    );
  }
}
