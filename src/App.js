import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Navbar from "./components/navbar.component";
import DevicesList from "./components/devices-list.component";
import EditDevice from "./components/edit-device.component";
import CreateDevice from "./components/create-device.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Container>
        <Route path="/" exact component={DevicesList} />
        <Route path="/edit/:id" component={EditDevice} />
        <Route path="/create" component={CreateDevice} />
      </Container>
    </Router>
  );
}

export default App;
