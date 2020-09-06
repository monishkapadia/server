import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            name="home"
            to="/"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            name="devices"
            to="/"
            active={activeItem === "devices"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            name="create device"
            to="/create"
            active={activeItem === "create device"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    );
  }
}
