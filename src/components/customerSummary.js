import React, {Component} from 'react'
import { inject } from 'mobx-react'
import {Button} from 'react-bootstrap'

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
        <Button className="btn btn-default" onClick={console.log('See customer projects')}>Projects</Button>
        <Button className="btn btn-default" onClick={this.props.page.customerEditPage}>Edit</Button>
      </div>
    )
  }
}
