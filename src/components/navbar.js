import React, { Component } from 'react'
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap'
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
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              <MenuItem onClick={() => this.props.page.createNewProjMenuItem()}>Create New Project</MenuItem>
              <MenuItem onClick={() => this.props.page.projectsMenuItem()}>Projects List</MenuItem>
              <MenuItem>Time Entry</MenuItem>
              <MenuItem onClick={() => this.props.page.customerInfoMenuItem()}>Customer Information</MenuItem>
            </NavDropdown>
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
