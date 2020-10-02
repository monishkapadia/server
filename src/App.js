import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Container } from "semantic-ui-react";

import DeviceData from './components/device-data.component';
import Chart from './components/chart.component';
import NotFound from './components/not-found.component';

function App() {
    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/" component={DeviceData} />
                    <Route path="/IoTDevice/:id" component={Chart} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
