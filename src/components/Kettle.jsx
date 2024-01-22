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

  // Конструктор класса Kettle инициализирует состояние компонента, включая значения isOn, temperature и waterLevel.

  togglePower() {
    this.setState((prevState) => ({
      isOn: !prevState.isOn,
    }));

    // Метод togglePower обрабатывает нажатие на кнопку "Включить/Выключить". Он изменяет состояние isOn на противоположное
    // и запускает или останавливает процесс закипания воды.

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

  // Метод boilWater запускает процесс закипания воды. Он использует setInterval для увеличения температуры
  //каждую секунду, пока температура не достигнет 100 градусов или пока чайник не будет выключен. При достижении
  //100 градусов процесс закипания останавливается.

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Метод componentWillUnmount очищает интервал, чтобы предотвратить утечку памяти при размонтировании компонента.

  handleWaterLevelChange(event) {
    const waterLevel = parseFloat(event.target.value);
    if (waterLevel >= 0 && waterLevel <= 1.0) {
      this.setState({
        waterLevel: waterLevel,
      });
    }
  }

  // Метод handleWaterLevelChange обрабатывает изменение значения в поле ввода количества воды.
  //Он обновляет состояние waterLevel, если введенное значение находится в диапазоне от 0 до 1.

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

// Компонент Kettle представляет электрический чайник. Он содержит кнопку для включения/выключения чайника,
//поле ввода для изменения количества воды, а также информацию о количестве воды, времени закипания и текущей
//температуре. Когда чайник включен, он начинает нагревать воду до 100 градусов. Если количество воды равно 0,
//кнопка включения чайника становится недоступной, и выводится сообщение "Чайник пуст! Добавьте воду.". Если температура
//достигает 100 градусов, выводится сообщение "Чайник вскипел!". Если чайник выключен во время закипания и температура не
//равна 20 градусам, выводится сообщение "Чайник остановлен!".
