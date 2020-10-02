import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Table, Container } from 'semantic-ui-react'
import axios from 'axios';


export class DeviceData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get(`/data`)
            .then(res => {
                const data = res.data;
                console.log(data);
                this.setState({ data: data });
            })
    }

    render = () => (
        <Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>UUID</Table.HeaderCell>
                        <Table.HeaderCell>IP Address</Table.HeaderCell>
                        <Table.HeaderCell>Temperature</Table.HeaderCell>
                        <Table.HeaderCell>Temperature Unit</Table.HeaderCell>
                        <Table.HeaderCell>Humidity</Table.HeaderCell>
                        <Table.HeaderCell>Latitude</Table.HeaderCell>
                        <Table.HeaderCell>Longitude</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.data.map(data => (
                        <Table.Row>
                            <Table.Cell>
                                <Link to={`/IoTDevice/${data.UUID}`}>{data.UUID}</Link>
                            </Table.Cell>
                            <Table.Cell>{data.IPAddress}</Table.Cell>
                            <Table.Cell>{data.temp}</Table.Cell>
                            <Table.Cell>{data.temp_unit}</Table.Cell>
                            <Table.Cell>{data.humidity}</Table.Cell>
                            <Table.Cell>{data.lat}</Table.Cell>
                            <Table.Cell>{data.lon}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

            </Table>
        </Container>
    )
}

export default DeviceData

