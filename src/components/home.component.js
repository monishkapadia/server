import React, { Component } from "react";
import { Card, Container } from 'semantic-ui-react'
import axios from 'axios';

// const server = 'http://10.0.0.252:5000';
const server = "";
export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
        }
    }


    componentDidMount() {
        this.getData()
        setInterval(this.getData, 10000);
    }

    getData = () => {
        axios.get(`${server}/data/distinct`)
            .then(res => {
                const data = res.data;
                data.forEach(element => {
                    axios.get(`${server}/devices/${element._id}`)
                        .then(res => {
                            if (!(res.data === null)) {
                                element.dataInterval = parseInt(res.data.dataInterval);
                            } else {
                                element.dataInterval = 60;
                            }
                        })
                        .then(() => {
                            element.lastTimeStamp = new Date(element.time);
                            let now = new Date();
                            if ((now.getTime() - element.lastTimeStamp.getTime()) > ((element.dataInterval * 1000) + 5 * 60 * 1000)) {
                                element.connected = false
                            } else {
                                element.connected = true
                            }
                        })
                        .then(() => {
                            this.setState({ devices: data });
                        })
                });
            })
    }

    render = () => (
        <Container>
            <h1>Devices</h1>
            <Card.Group>
                {this.state.devices.map(data => (
                    <Card href={'/IoTDevice/' + data._id} key={data._id} color={(data.connected ? 'green' : 'red')}>
                        <Card.Content textAlign='center'>
                            <Card.Header>pi-{data._id}</Card.Header>
                            <Card.Description textAlign='left'>
                                <p>Temperature: {data.temp}° {data.temp_unit}</p>
                                <p>Humidity: {data.humidity}%</p>
                                <p>Latitude: {data.lat}</p>
                                <p>Longitude: {data.lon}</p>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content textAlign='right' extra>
                            <span className={'status ' + (data.connected ? 'success' : 'danger')}>
                                <i className="pulse"></i>
                                {data.connected ? 'Online' : 'Offline'}
                            </span>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Container>

    )

}

export default Home