import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Table, Grid, Button, Modal, Form, Input, Dropdown, Icon, Segment } from 'semantic-ui-react'
import axios from 'axios';

// const server = 'http://192.168.0.10:5000'
const server = ''
const rebootOptions = [
    { key: '0', text: 'No', value: '0' },
    { key: '1', text: 'Yes', value: '1' },
]

const tempOptions = [
    { key: 'F', text: 'Farenheit', value: 'F' },
    { key: 'C', text: 'Celsius', value: 'C' },
]

export class DeviceData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            deviceSettings: {
                UUID: "",
                DeviceNumber: "",
                IPAddress: "",
                dataInterval: "",
                reboot: "",
                tempUnit: "",
                minTemp: "",
                maxTemp: "",
                minHum: "",
                maxHum: ""
            },
            deviceUpdated: true,
            showNotice: false,
            openModal: false
        }
    }

    setOpen = (open) => {
        this.setState({ openModal: open });
    }

    formatAMPM = (strDate) => {
        var date = new Date(strDate);
        var eventDate = date.toDateString()
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return eventDate + ' ' + strTime;
    }

    handleChange = (e, { name, value }) => {
        this.setState(prevState => ({
            deviceSettings: {
                ...prevState.deviceSettings,
                [name]: value
            }
        }))
    }

    handleSubmit = () => {
        this.setState({ showNotice: true, openModal: false })
        axios.post(`${server}/devices/update`, this.state.deviceSettings)
            .then((res) => this.setState({ deviceUpdated: true }))
            .catch((err) => this.setState({ deviceUpdated: false }));
    }

    componentDidMount() {
        axios.get(`${server}/data/${this.props.match.params.id}`)
            .then(res => {
                const data = res.data;
                data.forEach(element => {
                    element.time = this.formatAMPM(element.time)
                });
                this.setState({ data: data });
            });

        axios.get(`${server}/devices/${this.props.match.params.id}`)
            .then(res => {
                const data = res.data;
                delete data._id;
                delete data.createdAt;
                delete data.updatedAt;
                delete data.__v;

                this.setState({ deviceSettings: data });
            })
    }

    cancelNotice = () => {
        this.setState({ showNotice: false });
    }

    render = () => (
        <Grid.Column>
            {this.state.showNotice &&
                <Segment padded inverted color={this.state.deviceUpdated ? 'green' : 'red'} secondary>
                    <Grid>
                        <Grid.Column width={15}>
                            {this.state.deviceUpdated ?
                                'Updated device settings!' : 'Failed to updated(Check all parameters are passed)!'}
                        </Grid.Column>
                        <Grid.Column width={1}><Icon onClick={this.cancelNotice} link name='cancel' /></Grid.Column>
                    </Grid>
                </Segment>
            }

            <div className='container__table'>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>UUID</Table.HeaderCell>
                            <Table.HeaderCell>IP Address</Table.HeaderCell>
                            <Table.HeaderCell>Temperature</Table.HeaderCell>
                            <Table.HeaderCell>Temperature <br></br> Unit</Table.HeaderCell>
                            <Table.HeaderCell>Humidity</Table.HeaderCell>
                            <Table.HeaderCell>Latitude</Table.HeaderCell>
                            <Table.HeaderCell>Longitude</Table.HeaderCell>
                            <Table.HeaderCell>Recorded Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.data.map(data => (
                            <Table.Row key={data._id}>
                                <Table.Cell>
                                    <Link to={`/IoTDevice/live/${data.UUID}`}>{data.UUID}</Link>
                                </Table.Cell>
                                <Table.Cell>{data.IPAddress}</Table.Cell>
                                <Table.Cell>{data.temp}</Table.Cell>
                                <Table.Cell>{data.temp_unit}</Table.Cell>
                                <Table.Cell>{data.humidity}</Table.Cell>
                                <Table.Cell>{data.lat}</Table.Cell>
                                <Table.Cell>{data.lon}</Table.Cell>
                                <Table.Cell>{data.time}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <Grid.Column>
                <Modal
                    onClose={() => this.setOpen(false)}
                    onOpen={() => this.setOpen(true)}
                    size='tiny'
                    open={this.state.openModal}
                    trigger={<Button primary>Device Settings</Button>}
                >
                    <Modal.Header>Update Device Settings</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group>
                                <Form.Input label='UUID' placeholder={this.state.deviceSettings.UUID} readOnly width={10} />
                                <Form.Input label='IP Address' placeholder={this.state.deviceSettings.IPAddress} readOnly width={6} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Field required width={6}>
                                    <label>Data Interval(in secs)</label>
                                    <Input name='dataInterval' defaultValue={this.state.deviceSettings.dataInterval} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field required width={4}>
                                    <label>Reboot</label>
                                    <Dropdown name="reboot" selection defaultValue={this.state.deviceSettings.reboot} options={rebootOptions} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field required width={6}>
                                    <label>Temperature Unit</label>
                                    <Dropdown name="tempUnit" selection defaultValue={this.state.deviceSettings.tempUnit} options={tempOptions} onChange={this.handleChange} />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label>Alert Range</label>
                            </Form.Field>
                            <Form.Group>
                                <Form.Field required width={4}>
                                    <label>Temp (min)</label>
                                    <Input name="minTemp" defaultValue={this.state.deviceSettings.minTemp} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field required width={4}>
                                    <label>Temp (max)</label>
                                    <Input name="maxTemp" defaultValue={this.state.deviceSettings.maxTemp} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field required width={4}>
                                    <label>Humidity (min)</label>
                                    <Input name="minHum" defaultValue={this.state.deviceSettings.minHum} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field required width={4}>
                                    <label>Humidity (max)</label>
                                    <Input name="maxHum" defaultValue={this.state.deviceSettings.maxHum} onChange={this.handleChange} />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            content="Nope"
                            labelPosition='right'
                            icon='cancel'
                            color='black'
                            onClick={() => this.setOpen(false)} />
                        <Button
                            content="Update"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={() => this.handleSubmit()}
                            positive
                        />
                    </Modal.Actions>
                </Modal>

                <Button positive as={Link} to={`/IoTDevice/live/${this.props.match.params.id}`}>Live Chart</Button>
            </Grid.Column>
        </Grid.Column>
    )
}

export default DeviceData

