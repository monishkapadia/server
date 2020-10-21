import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import { Button } from 'semantic-ui-react'
import 'chartjs-plugin-zoom';
import axios from 'axios';

// const server = 'http://10.0.0.252:5000';
const server = '';

const convertDate = (date) => {
    let d = new Date(date);
    console.log(d);
    return d.toTimeString().split(" ")[0];
}
const setStateData = (labelName, data) => {
    const label = data.map(x => convertDate(x[0]));
    const value = data.map(x => x[1]);
    return ({
        labels: label,
        datasets: [
            {
                label: labelName,
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,201,255,0.4)',
                borderColor: 'rgba(0,201,255,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(0,201,255,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(0,201,255,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: value
            }
        ],
    });
}

class Charts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: 1,
            tempData: [],
            humidityData: [],
            timeDate: []
        }
    }

    getData = () => {
        this.setState({
            tempData: [],
            humidityData: [],
            timeDate: []
        })
        axios.get(`${server}/data/distinct`)
            .then((res) => {
                const data = res.data;
                data.forEach(el => {
                    axios.get(`${server}/data/charts/${el._id}?time=${this.state.date}`)
                        .then((res) => {
                            const deviceTemp = res.data.map(d => [d.time, d.temp]);
                            const deviceHumidity = res.data.map(d => [d.time, d.humidity]);
                            this.setState({
                                tempData: [...this.state.tempData, deviceTemp],
                                humidityData: [...this.state.humidityData, deviceHumidity],
                            });
                        })
                })
            })
            .catch((err) => console.log(err))
    }
    handleTime = (t) => {
        this.setState({ date: t });
        this.getData();
    }
    componentDidMount() {
        this.getData();
    }
    render = () => (
        <div>
            <h1>Charts</h1>
            <Button.Group floated="right">
                <Button
                    content="1 year"
                    onClick={() => this.handleTime(365)}
                />
                <Button
                    content="6 months"
                    onClick={() => this.handleTime(183)}
                />
                <Button
                    content="1 month"
                    onClick={() => this.handleTime(30)}
                />
                <Button
                    content="1 week"
                    onClick={() => this.handleTime(7)}
                />
                <Button
                    content="1 day"
                    onClick={() => this.handleTime(1)}
                />
            </Button.Group>
            {this.state.tempData.map(data => (
                <Line height={50} data={setStateData("Temperature", data)} options={{
                    zoom: {
                        enabled: true,
                        mode: 'x',
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
                    },
                }} />
            ))}
        </div>
    )
}

export default Charts