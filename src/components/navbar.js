import React, { Component } from 'react'
import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import PromptModal from './promptModal'

/**
 * NavBar component; constructor binds functions
 * @namespace NavBar
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject('page', 'website') @observer
export default class NavBar extends Component{
  constructor(props){
    super(props)
    this.logoutClick = this.logoutClick.bind(this)
    this.renderLogOut = this.renderLogOut.bind(this)
    this.promptConfirm = this.promptConfirm.bind(this)
    this.promptDismiss = this.promptDismiss.bind(this)
  }

  /**
   * Opens log out modal
   * @method logoutClick
   * @memberof NavBar.prototype
   */
  logoutClick(){
    this.props.website.logOutAlert()
  }

  /**
   * Renders log out clickable item and current user name
   * @method renderLogOut
   * @memberof NavBar.prototype
   * @return {Component}
   */
  renderLogOut(){
    return (
      <div>
        <Nav pullRight>
          <NavItem onClick={this.logoutClick}>Log Out</NavItem>
        </Nav>
        <Navbar.Text pullRight style={{marginRight: '10px'}}>
          <img src="../../style/open-iconic-master/svg/person.svg" alt="person" style={{width: '16px', marginRight: '5px'}}/>
          {this.props.website.currentUser.username}
        </Navbar.Text>
      </div>
    )
  }

  /**
   * Sets user to null
   * @method promptConfirm
   * @memberof NavBar.prototype
   */
  promptConfirm(){
    this.props.website.setUser(null)
  }

  /**
   * Closes log out modal
   * @method promptDismiss
   * @memberof NavBar.prototype
   */
  promptDismiss(){
    this.props.website.logOutDismiss()
  }

  /**
   * Renders HTML div component containing PromptModal, NavBar
   * @method render
   * @memberof NavBar.prototype
   * @see {@link PromptModal}
   * @see {@link https://react-bootstrap.github.io/components/navbar/ ReactBootstrap.NavBar}
   */
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
              <NavItem onClick={this.props.page.createNewProjMenuItem}>New Project</NavItem>
              <NavItem onClick={this.props.page.projectsMenuItem}>Project Information</NavItem>
              <NavItem onClick={this.props.page.projectTimeEntryMenuItem}>Time Entry</NavItem>
              <NavItem onClick={this.props.page.customerInfoMenuItem}>Customer Information</NavItem>
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
            {this.props.website.currentUser && this.renderLogOut()}
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
