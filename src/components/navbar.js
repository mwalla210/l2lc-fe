import React, { Component } from 'react'
import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import PromptModal from './promptModal'

@inject('page', 'website') @observer
export default class NavBar extends Component{
  constructor(props){
    super(props)
    this.renderUser = this.renderUser.bind(this)
    this.logoutClick = this.logoutClick.bind(this)
    this.renderLogOut = this.renderLogOut.bind(this)
    this.promptConfirm = this.promptConfirm.bind(this)
    this.promptDismiss = this.promptDismiss.bind(this)
  }

  renderUser(){
    return (
      <Navbar.Text pullRight style={{marginRight: '10px'}}>
        <img src="../../style/open-iconic-master/svg/person.svg" alt="person" style={{width: '16px', marginRight: '5px'}}/>
        {this.props.website.currentUser.username}
      </Navbar.Text>
    )
  }

  logoutClick(){
    this.props.website.logOutAlert()
  }

  renderLogOut(){
    return (
      <Nav pullRight>
        <NavItem onClick={this.logoutClick}>Log Out</NavItem>
      </Nav>
    )
  }

  promptConfirm(){
    this.props.page.logOut()
  }

  promptDismiss(){
    this.props.website.logOutDismiss()
  }

  render(){
    return (
      <div>
        <PromptModal
          title="Log Out"
          confirmOnClick={this.promptConfirm}
          denyOnClick={this.promptDismiss}
          open={this.props.website.logOutModalOpen}
          closeFn={this.promptDismiss}
          content="Are you sure you want to log out?"
          confirmClass="btn-primary"
        />
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand >
              <a>L2LC Cloud</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={this.props.page.createNewProjMenuItem}>
                New Project
              </NavItem>
              <NavItem onClick={this.props.page.projectsMenuItem}>
                Projects List
              </NavItem>
              <NavItem onClick={this.props.page.projectTimeEntryMenuItem}>
                Time Entry
              </NavItem>
              <NavItem onClick={this.props.page.customerInfoMenuItem}>
                Customer Information
              </NavItem>
              <NavDropdown title="Analytics" id="basic-nav-dropdown">
                <MenuItem onClick={this.props.page.emplProductivityMenuItem}>Employee Productivity</MenuItem>
                <MenuItem onClick={this.props.page.workstationTrackingMenuItem}>Workstation Tracking</MenuItem>
                <MenuItem onClick={this.props.page.jobTypeProductivityMenuItem}>Job Type Productivity</MenuItem>
                <MenuItem onClick={this.props.page.costCenterTimeMenuItem}>Cost Center Time</MenuItem>
              </NavDropdown>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <MenuItem onClick={this.props.page.employeeInformationMenuItem}>Employee Information</MenuItem>
                <MenuItem onClick={this.props.page.accountManagementMenuItem}>Account Information</MenuItem>
              </NavDropdown>
            </Nav>
            {this.props.website.currentUser &&
              this.renderLogOut() &&
              this.renderUser()
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
