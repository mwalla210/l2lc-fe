import React, { Component } from 'react'
import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap'
import { inject } from 'mobx-react'

@inject('page')
export default class NavBar extends Component{
  render(){
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand >
            <a>L2LC Cloud</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onClick={() => this.props.page.createNewProjMenuItem()}>
              New Project
            </NavItem>
            <NavItem onClick={() => this.props.page.projectsMenuItem()}>
              Projects List
            </NavItem>
            <NavItem>
              Time Entry
            </NavItem>
            <NavItem onClick={() => this.props.page.customerInfoMenuItem()}>
              Customer Information
            </NavItem>
            <NavDropdown title="Analytics" id="basic-nav-dropdown">
              <MenuItem>Employee Productivity</MenuItem>
              <MenuItem>Workstation Tracking</MenuItem>
              <MenuItem>Job Type Productivity</MenuItem>
              <MenuItem>Cost Center Time</MenuItem>
            </NavDropdown>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <MenuItem>Employee Information</MenuItem>
              <MenuItem>Account Information</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
