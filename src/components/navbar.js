import React, { Component } from 'react'
import { Navbar, Nav, NavbarBrand, Collapse, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, NavItem, NavLink } from 'reactstrap'
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
   * Sets user to null
   * @method promptConfirm
   * @memberof NavBar.prototype
   */
  promptConfirm(){
    this.props.website.logOutDismiss()
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
   * @see {@link https://reactstrap.github.io/components/navbar/ Reactstrap.NavBar}
   */
  render(){
    let mainLinks = [
      {
        click: this.props.page.createNewProjMenuItem,
        title: 'New Project'
      },
      {
        click: this.props.page.projectsMenuItem,
        title: 'Project Information'
      },
      {
        click: this.props.page.projectTimeEntryMenuItem,
        title: 'Time Entry'
      },
      {
        click: this.props.page.customerInfoMenuItem,
        title: 'Customer Information'
      },
      {
        click: this.props.page.analyticsMenuItem,
        title: 'Analytics'
      },
    ]
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
        <Navbar dark expand="md" style={{marginBottom: '3px', borderRadius: '8px'}}>
          <NavbarBrand href="/">L2LC Cloud</NavbarBrand>
          <Collapse isOpen navbar>
            <Nav className="ml-auto" navbar>
              {mainLinks.map((set, index) => {
                return (
                  <NavItem key={index} style={{cursor: 'pointer'}}>
                    <NavLink onClick={set.click}>{set.title}</NavLink>
                  </NavItem>
                )
              })}
              {this.props.website.currentUser.admin &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>Admin</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.page.employeeInformationMenuItem}>Employee Information</DropdownItem>
                    <DropdownItem onClick={this.props.page.accountManagementMenuItem}>Account Information</DropdownItem>
                    <DropdownItem onClick={this.props.page.stationMenuItem}>Station Information</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              <NavItem>
                <p className="nav-link nohover" style={{marginRight: '10px', marginBottom: '0px'}}>
                  <img src="../../style/open-iconic-master/svg/person.svg" alt="person" style={{width: '16px', marginRight: '5px'}}/>
                  {this.props.website.currentUser.username}
                </p>
              </NavItem>
              <NavItem style={{cursor: 'pointer'}}>
                <NavLink onClick={this.logoutClick}>Log Out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
