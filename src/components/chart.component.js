import React, { Component } from "react";
import io from 'socket.io-client';
import { Grid, Container } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

const SOCKETIO_ERRORS = ['reconnect_error', 'connect_error', 'connect_timeout', 'connect_failed', 'error'];
const MAX_POINTS_TO_STORE = 10;

const getState = (labelName, label, data) => ({
    labels: label,
    datasets: [
        {
            label: labelName,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data
        }
    ]
});

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: [],
            temp_unit: 'Farenheit',
            humidity: [],
            time: [],
            connected: false,
            tempChart: {},
            humidityChart: {},
            error: ''
        }
    }

    componentDidMount() {
        this.connect();
    }

    connect = () => {
        this.socket = io();
        this.socket.on(this.props.match.params.id, this.storeReading);

        // Various Errors handling
        SOCKETIO_ERRORS.forEach(errType => {
            this.socket.on(errType, (error) => this.setError(errType, error));
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    setError = (type, error) => {
        this.setState({ temp: [], humidity: [], time: [], connected: false, tempChart: {}, error: `${error.toString()} | ${type}` });
    }

    storeReading = (response) => {
        const rawData = JSON.parse(response);
        this.setState((prevState) => {
            const temp = prevState.temp;
            const temp_unit = (rawData["temp_unit"] === 'C') ? `Celsuis` : `Farenheit`;
            const humidity = prevState.humidity;
            const time = prevState.time;
            const pointsToStore = Math.max(time.length - MAX_POINTS_TO_STORE, 0);
            let dataTime = new Date(rawData["time"]);
            temp.push(rawData["temp"]);
            humidity.push(rawData["humidity"]);
            time.push(dataTime.toTimeString().split(" ")[0]);

            return {
                temp: temp.slice(pointsToStore),
                temp_unit: temp_unit,
                humidity: humidity.slice(pointsToStore),
                label: time.slice(pointsToStore),
                connected: true,
                tempChart: getState(`Temperature (°${rawData["temp_unit"]})`, time.slice(pointsToStore), temp.slice(pointsToStore)),
                humidityChart: getState(`Humidity`, time.slice(pointsToStore), humidity.slice(pointsToStore))
            }
        });
    }

    render = () => (
        <Container>
            <h2>IoT Dashboard</h2>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <div className="card">
                            <Grid padded>
                                <Grid.Column width={1}></Grid.Column>
                                <Grid.Column width={10}><h5>Temperature (in {this.state.temp_unit})</h5></Grid.Column>
                                <Grid.Column width={5}>
                                    <span className={'status ' + (this.state.connected ? 'success' : 'danger')}>
                                        {this.state.error}
                                        <i className="pulse"></i>
                                        {this.state.connected ? 'Connected' : 'Disconnected'}
                                    </span>
                                </Grid.Column>
                            </Grid>
                            <Line data={this.state.tempChart} legend={{ display: false }} />
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className="card">
                            <Grid padded>
                                <Grid.Column width={1}></Grid.Column>
                                <Grid.Column width={10}><h5>Humidity (%)</h5></Grid.Column>
                                <Grid.Column width={5}>
                                    <span className={'status ' + (this.state.connected ? 'success' : 'danger')}>
                                        {this.state.error}
                                        <i className="pulse"></i>
                                        {this.state.connected ? 'Connected' : 'Disconnected'}
                                    </span>
                                </Grid.Column>
                            </Grid>
                            <Line data={this.state.humidityChart} />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Container>
    )
}

export default Chart;