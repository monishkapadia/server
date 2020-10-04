import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const srcLogo = 'https://static.wixstatic.com/media/047343_2863242c20da4b88968c8fe8d11e2e48~mv2.png/v1/crop/x_1,y_0,w_1320,h_557/fill/w_399,h_168,al_c,q_85,usm_0.66_1.00_0.01/047343_2863242c20da4b88968c8fe8d11e2e48~mv2.webp';
export default class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu stackable secondary size="large">
          <Menu.Item>
            <Image src={srcLogo} size='small' />
          </Menu.Item>
          <Menu.Item
            as={Link}
            name="home"
            to="/"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    );
  }
}
