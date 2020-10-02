import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Modal, Icon, Button } from "semantic-ui-react";
import axios from "axios";

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
      <Button color="blue" inverted as={Link} to={"/edit/" + props.device._id}>
        edit
      </Button>{" "}
      <Button
        color="red"
        inverted
        onClick={() => {
          props.confirmOpen(props.device._id);
        }}
      >
        delete
      </Button>
    </Table.Cell>
  </Table.Row>
);

export default class DevicesList extends Component {
  constructor(props) {
    super(props);

    this.deleteDevice = this.deleteDevice.bind(this);
    this.confirmOpen = this.confirmOpen.bind(this);

    this.state = { confirmOpen: false, devices: [], currentDeviceId: "" };
  }

  componentDidMount() {
    axios
      .get("http://192.168.0.10:5000/devices/")
      .then((response) => {
        this.setState({ devices: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  confirmOpen = (id) =>
    this.setState({ confirmOpen: true, currentDeviceId: id });

  handleClose = () =>
    this.setState({ currentDeviceId: "", confirmOpen: false });

  handleConfirm = () => {
    this.deleteDevice(this.state.currentDeviceId);
    this.setState({ currentDeviceId: "", confirmOpen: false });
  };

  deleteDevice(id) {
    axios.delete("http://192.168.0.10:5000/devices/" + id).then((response) => {
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
          confirmOpen={this.confirmOpen}
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
        <Modal
          onClose={this.handleClose}
          open={this.state.confirmOpen}
          size="tiny"
        >
          <Modal.Header>Delete the device</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete the device</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleClose}>
              <Icon name="remove" /> No
            </Button>
            <Button color="red" inverted onClick={this.handleConfirm}>
              <Icon name="checkmark" /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
