import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, ButtonGroup} from 'reactstrap'
import Consts from '../consts'

/**
 * CustomerSummary component
 * @namespace CustomerSummary
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject ('website', 'page') @observer
export default class CustomerSummary extends Component {
  /**
   * Renders HTML div component, containing customer details and buttons
   * @method render
   * @memberof CustomerSummary.prototype
   * @return {Component}
   * @see {@link https://reactstrap.github.io/components/button-group/ Reactstrap.ButtonGroup}
   */
  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <div {...Consts.summaryProps}>
            <h5>Main Information</h5>
            <div><h6>Company</h6><p>{this.props.website.currentCustomer.companyName}</p></div>
            <div><h6>Phone Number</h6><p>{this.props.website.currentCustomer.phone}</p></div>
            <div><h6>Email</h6><p>{this.props.website.currentCustomer.email}</p></div>
            {this.props.website.currentCustomer.website && <div><h6>Website</h6><p>{this.props.website.currentCustomer.website}</p></div>}
            {this.props.website.currentCustomer.pastDue && <div><h6>Past Due</h6><p>{this.props.website.currentCustomer.pastDue}</p></div>}
          </div>
          <div {...Consts.summaryProps}>
            <h5>Address Information</h5>
            <div>
              <h6>Shipping</h6>
              <div>
                <p><span style={{whiteSpace: 'pre-line'}}>{this.props.website.currentCustomer.formattedShipAddress}</span></p>
              </div>
            </div>
            <div>
              <h6>Billing</h6>
              <div>
                <p><span style={{whiteSpace: 'pre-line'}}>{this.props.website.currentCustomer.formattedBillAddress}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <ButtonGroup>
            <ButtonDropdown isOpen={this.props.website.summaryMoreDropdownOpen} toggle={this.props.website.toggleSummaryMoreDD}>
              <DropdownToggle outline color="secondary" caret>More...</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={console.log('See customer projects')}>Projects</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
            {this.props.website.currentUser.admin &&
              <ButtonDropdown isOpen={this.props.website.summaryActionsDropdownOpen} toggle={this.props.website.toggleSummaryActionsDD}>
                <DropdownToggle color="primary" caret>Actions</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.props.page.customerEditPage}>Edit</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            }
          </ButtonGroup>
        </div>
      </div>
    )
  }
}
