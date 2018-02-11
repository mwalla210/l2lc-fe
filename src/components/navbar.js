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
            <NavItem onClick={() => this.props.page.projectTimeEntryMenuItem()}>
              Time Entry
            </NavItem>
            <NavItem onClick={() => this.props.page.customerInfoMenuItem()}>
              Customer Information
            </NavItem>
            <NavDropdown title="Analytics" id="basic-nav-dropdown">
              <MenuItem onClick={() => this.props.page.emplProductivityMenuItem()}>Employee Productivity</MenuItem>
              <MenuItem onClick={() => this.props.page.workstationTrackingMenuItem()}>Workstation Tracking</MenuItem>
              <MenuItem onClick={() => this.props.page.jobTypeProductivityMenuItem()}>Job Type Productivity</MenuItem>
              <MenuItem onClick={() => this.props.page.costCenterTimeMenuItem()}>Cost Center Time</MenuItem>
            </NavDropdown>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <MenuItem onClick={() => this.props.page.employeeInformationMenuItem()}>Employee Information</MenuItem>
              <MenuItem onClick={() => this.props.page.accountManagementMenuItem()}>Account Information</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem onClick={() => this.props.page.logOut()}>
              Log Out
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
