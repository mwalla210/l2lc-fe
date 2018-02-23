import React, {Component} from 'react'
import { inject } from 'mobx-react'

@inject ('website')
export default class CustomerSummary extends Component {
  render() {
    return (
      <div>
        <p>ID: {this.props.website.currentCustomer.id}</p>
        <p>Company Name: {this.props.website.currentCustomer.companyName}</p>
        <p>Phone Number: {this.props.website.currentCustomer.phone}</p>
        <p>Email: {this.props.website.currentCustomer.email}</p>
        <p>this.props.website: {this.props.website.currentCustomer.website}</p>
        <p>Country: {this.props.website.currentCustomer.shipAddr.shipCountry}</p>
        <p>Address: {this.props.website.currentCustomer.shipAddr.shipAddr1} {this.props.website.currentCustomer.shipAddr.shipAddr2}</p>
        <p>City: {this.props.website.currentCustomer.shipAddr.shipCity}</p>
        <p>State: {this.props.website.currentCustomer.shipAddr.shipState}</p>
        <p>Zip Code: {this.props.website.currentCustomer.shipAddr.shipZip}</p>
        <p>Billing Country: {this.props.website.currentCustomer.billAddr.billCountry}</p>
        <p>Billing Address: {this.props.website.currentCustomer.billAddr.billAddr1} {this.props.website.currentCustomer.billAddr.billAddr2}</p>
        <p>Billing City: {this.props.website.currentCustomer.billAddr.billCity}</p>
        <p>Billing State: {this.props.website.currentCustomer.billAddr.billState}</p>
        <p>Billing Zip Code: {this.props.website.currentCustomer.billAddr.billZip}</p>
        <p>Past due: {this.props.website.currentCustomer.pastDue}</p>
      </div>
    )
  }
}
