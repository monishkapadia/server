import React, { Component } from "react";
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { Image, Icon } from 'semantic-ui-react'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = { activeItem: "home" };

  render() {
    return (
      <div>
        <ProSidebar>
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

            <Menu iconShape="square">
              <MenuItem >
                <Icon name="home" />
                Home
                <Link to="/" />
              </MenuItem>
              <MenuItem>
                <Icon name="bell outline" />
                Alert
                <Link to="/" />
              </MenuItem>
              <MenuItem>
                <Icon name="chart bar outline" />
                Chart
                <Link to="/" />
              </MenuItem>
              <MenuItem>
                <Icon name="user outline" />
                Profile
                <Link to="/" />
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    );
  }
}
