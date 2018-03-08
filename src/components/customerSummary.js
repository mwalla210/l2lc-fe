import React, {Component} from 'react'
import { inject } from 'mobx-react'
import {DropdownButton, MenuItem, ButtonToolbar, ButtonGroup} from 'react-bootstrap'

@inject ('website', 'page')
export default class CustomerSummary extends Component {
  render() {
    return (
      <div>
        <p>{`ID: ${this.props.website.currentCustomer.id}`}</p>
        <p>{`Company Name: ${this.props.website.currentCustomer.companyName}`}</p>
        <p>{`Phone Number: ${this.props.website.currentCustomer.phone}`}</p>
        <p>{`Email: ${this.props.website.currentCustomer.email}`}</p>
        <p>{`Website: ${this.props.website.currentCustomer.website}`}</p>
        <p>{`Ship addr: ${this.props.website.currentCustomer.formattedShipAddress}`}</p>
        <p>{`Bill addr: ${this.props.website.currentCustomer.formattedBillAddress}`}</p>
        <p>{`Past due: ${this.props.website.currentCustomer.pastDue}`}</p>
        <ButtonToolbar>
          <ButtonGroup>
            <DropdownButton bsStyle="info" title="More..." id="dropdown-info">
              <MenuItem onSelect={console.log('See customer projects')}>Projects</MenuItem>
            </DropdownButton>
          </ButtonGroup>
          <ButtonGroup>
            <DropdownButton bsStyle="primary" title="Actions" id="dropdown-primary">
              <MenuItem onSelect={this.props.page.customerEditPage}>Edit</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}
