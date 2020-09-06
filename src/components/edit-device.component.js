import React, { Component } from "react";
import axios from "axios";
import { Input, Button, Form } from "semantic-ui-react";

export default class EditDevice extends Component {
  constructor(props) {
    super(props);

    this.onChangeDeviceNumber = this.onChangeDeviceNumber.bind(this);
    this.onChangeIPAddress = this.onChangeIPAddress.bind(this);
    this.onChangeDataInterval = this.onChangeDataInterval.bind(this);
    this.onChangeReboot = this.onChangeReboot.bind(this);
    this.onChangeTempUnit = this.onChangeTempUnit.bind(this);
    this.onChangeMinTemp = this.onChangeMinTemp.bind(this);
    this.onChangeMaxTemp = this.onChangeMaxTemp.bind(this);
    this.onChangeMinHum = this.onChangeMinHum.bind(this);
    this.onChangeMaxHum = this.onChangeMaxHum.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      DeviceNumber: "",
      IPAddress: "",
      dataInterval: "",
      reboot: "",
      tempUnit: "",
      minTemp: "",
      maxTemp: "",
      minHum: "",
      maxHum: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/devices/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          DeviceNumber: response.data.DeviceNumber,
          IPAddress: response.data.IPAddress,
          dataInterval: response.data.dataInterval,
          reboot: response.data.reboot,
          tempUnit: response.data.tempUnit,
          minTemp: response.data.minTemp,
          maxTemp: response.data.maxTemp,
          minHum: response.data.minHum,
          maxHum: response.data.maxHum,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeDeviceNumber(e) {
    this.setState({
      DeviceNumber: e.target.value,
    });
  }

  onChangeIPAddress(e) {
    this.setState({
      IPAddress: e.target.value,
    });
  }

  onChangeDataInterval(e) {
    this.setState({
      dataInterval: e.target.value,
    });
  }

  onChangeReboot(e) {
    this.setState({
      reboot: e.target.value,
    });
  }

  onChangeTempUnit(e) {
    this.setState({
      tempUnit: e.target.value,
    });
  }
  onChangeMinTemp(e) {
    this.setState({
      minTemp: e.target.value,
    });
  }
  onChangeMaxTemp(e) {
    this.setState({
      maxTemp: e.target.value,
    });
  }
  onChangeMinHum(e) {
    this.setState({
      minHum: e.target.value,
    });
  }

  onChangeMaxHum(e) {
    this.setState({
      maxHum: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const device = {
      DeviceNumber: this.state.DeviceNumber,
      IPAddress: this.state.IPAddress,
      dataInterval: this.state.dataInterval,
      reboot: this.state.reboot,
      tempUnit: this.state.tempUnit,
      minTemp: this.state.minTemp,
      maxTemp: this.state.maxTemp,
      minHum: this.state.minHum,
      maxHum: this.state.maxHum,
    };

    axios
      .post(
        "http://localhost:5000/devices/update/" + this.props.match.params.id,
        device
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Edit Device Log</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field inline>
            <label>Device Number: </label>
            <Input
              defaultValue={this.state.DeviceNumber}
              onChange={this.onChangeDeviceNumber}
            />
          </Form.Field>
          <Form.Field inline>
            <label>IPAddress: </label>
            <Input
              defaultValue={this.state.IPAddress}
              onChange={this.onChangeIPAddress}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Data Interval (in seconds): </label>
            <Input
              defaultValue={this.state.dataInterval}
              onChange={this.onChangeDataInterval}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Reboot: </label>
            <Input
              defaultValue={this.state.reboot}
              onChange={this.onChangeReboot}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Temp Unit: </label>
            <Input
              defaultValue={this.state.tempUnit}
              onChange={this.onChangeTempUnit}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Min Temp: </label>
            <Input
              defaultValue={this.state.minTemp}
              onChange={this.onChangeMinTemp}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Max Temp: </label>
            <Input
              defaultValue={this.state.maxTemp}
              onChange={this.onChangeMaxTemp}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Min Hum: </label>
            <Input
              defaultValue={this.state.minHum}
              onChange={this.onChangeMinHum}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Max Temp: </label>
            <Input
              defaultValue={this.state.maxHum}
              onChange={this.onChangeMaxHum}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}