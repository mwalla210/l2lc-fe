import React, { Component } from 'react'
import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import PromptModal from './promptModal'

@inject('page', 'website') @observer
export default class NavBar extends Component{
  renderUser(){
    return (
      <Navbar.Text pullRight>
        <img src='../../style/open-iconic-master/svg/person.svg' alt='person' style={{width: '16px', marginRight: '5px'}}/>
        {this.props.website.currentUser.username}
      </Navbar.Text>
    )
  }

  renderLogOut(){
    return (
      <Nav pullRight>
        <NavItem onClick={() => this.props.page.logOutAlert()}>Log Out</NavItem>
      </Nav>
    )
  }

  render(){
    return (
      <div>
        <PromptModal
          title='Log Out'
          confirmOnClick={() => this.props.page.logOut()}
          denyOnClick={() => this.props.page.logOutDismiss()}
          open={this.props.page.logOutModalOpen}
          closeFn={() => this.props.page.logOutDismiss()}
          content='Are you sure you want to log out?'
          confirmClass='btn-primary'
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
              <NavDropdown title='Analytics' id='basic-nav-dropdown'>
                <MenuItem onClick={() => this.props.page.emplProductivityMenuItem()}>Employee Productivity</MenuItem>
                <MenuItem onClick={() => this.props.page.workstationTrackingMenuItem()}>Workstation Tracking</MenuItem>
                <MenuItem onClick={() => this.props.page.jobTypeProductivityMenuItem()}>Job Type Productivity</MenuItem>
                <MenuItem onClick={() => this.props.page.costCenterTimeMenuItem()}>Cost Center Time</MenuItem>
              </NavDropdown>
              <NavDropdown title='Admin' id='basic-nav-dropdown'>
                <MenuItem onClick={() => this.props.page.employeeInformationMenuItem()}>Employee Information</MenuItem>
                <MenuItem onClick={() => this.props.page.accountManagementMenuItem()}>Account Information</MenuItem>
              </NavDropdown>
            </Nav>
            {this.props.website.currentUser &&
              this.renderLogOut()
            }
            {this.props.website.currentUser &&
              this.renderUser()
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
