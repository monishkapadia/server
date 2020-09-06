import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import axios from "axios";
import MyModal from "./my-modal.component";

const Device = (props) => (
  <Table.Row>
    <Table.Cell>{props.device.DeviceNumber}</Table.Cell>
    <Table.Cell>{props.device.IPAddress}</Table.Cell>
    <Table.Cell>{props.device.dataInterval}</Table.Cell>
    <Table.Cell>{props.device.reboot}</Table.Cell>
    <Table.Cell>{props.device.tempUnit}</Table.Cell>
    <Table.Cell>{props.device.minTemp}</Table.Cell>
    <Table.Cell>{props.device.maxTemp}</Table.Cell>
    <Table.Cell>{props.device.minHum}</Table.Cell>
    <Table.Cell>{props.device.maxHum}</Table.Cell>
    <Table.Cell>
      <Link to={"/edit/" + props.device._id}>edit</Link> |{" "}
      <a
        href="/"
        onClick={() => {
          props.deleteDevice(props.device._id);
          this.setState({ modalOpen: true });
        }}
      >
        delete
      </a>
    </Table.Cell>
  </Table.Row>
);

export default class DevicesList extends Component {
  constructor(props) {
    super(props);

    this.deleteDevice = this.deleteDevice.bind(this);

    this.state = { modalOpen: false, devices: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/devices/")
      .then((response) => {
        this.setState({ devices: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDevice(id) {
    axios.delete("http://localhost:5000/devices/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      devices: this.state.devices.filter((el) => el._id !== id),
    });
  }

  deviceList() {
    return this.state.devices.map((currentdevice) => {
      return (
        <Device
          device={currentdevice}
          deleteDevice={this.deleteDevice}
          key={currentdevice._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Devices</h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>DeviceNumber</Table.HeaderCell>
              <Table.HeaderCell>IPAddress</Table.HeaderCell>
              <Table.HeaderCell>dataInterval</Table.HeaderCell>
              <Table.HeaderCell>reboot</Table.HeaderCell>
              <Table.HeaderCell>tempUnit</Table.HeaderCell>
              <Table.HeaderCell>minTemp</Table.HeaderCell>
              <Table.HeaderCell>maxTemp</Table.HeaderCell>
              <Table.HeaderCell>minHum</Table.HeaderCell>
              <Table.HeaderCell>maxHum</Table.HeaderCell>
              <Table.HeaderCell>Edit/Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.deviceList()}</Table.Body>
        </Table>
      </div>
    );
  }
}
