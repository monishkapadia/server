import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Container } from "semantic-ui-react";

import Navbar from './components/navbar.component';
import Home from './components/home.component'
import DeviceData from './components/device-data.component';
import Chart from './components/chart.component';
import NotFound from './components/not-found.component';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Container>
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/IoTDevice/:id" component={DeviceData} />
                            <Route path="/IoTDevice/live/:id" component={Chart} />
                            <Route component={NotFound} />
                        </Switch>
                    </main>
                </Container>
            </div>
        </Router>
    );
}

export default App;
