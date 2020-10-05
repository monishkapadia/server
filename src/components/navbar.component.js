import React, { Component } from "react";
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { Image, Icon } from 'semantic-ui-react'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, name) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <ProSidebar breakPoint="md" toggled={false}>
          <SidebarHeader>
            <div>
              <Image src={logo} size='small' />
              <p style={{
                margin: '1em',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15,
                letterSpacing: '1px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                Dashboard</p>
            </div>
          </SidebarHeader>
          <SidebarContent>

            <Menu>
              <MenuItem active={activeItem === 'home'}>
                <Icon name="home" />
                Home
                <Link to="/" onClick={(e) => this.handleItemClick(e, "home")} />
              </MenuItem>
              <MenuItem active={activeItem === 'alert'}>
                <Icon name="bell outline" />
                Alert
                <Link to="/" onClick={(e) => this.handleItemClick(e, "alert")} />
              </MenuItem>
              <MenuItem active={activeItem === 'chart'}>
                <Icon name="chart bar outline" />
                Chart
                <Link to="/" onClick={(e) => this.handleItemClick(e, "chart")} />
              </MenuItem>
              <MenuItem active={activeItem === 'profile'}>
                <Icon name="user outline" />
                Profile
                <Link to="/" onClick={(e) => this.handleItemClick(e, "profile")} />
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    );
  }
}
