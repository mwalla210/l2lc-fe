import React, {Component} from 'react'
import { inject } from 'mobx-react'
import {DropdownButton, MenuItem, ButtonToolbar, ButtonGroup} from 'react-bootstrap'

@inject ('website', 'page')
export default class CustomerSummary extends Component {
  render() {
    let websiteStr1 = 'Website: '
    let websiteStr2 = this.props.website.currentCustomer.website
    let websiteContent1 = `${(this.props.website.currentCustomer.website == '') ? '' : websiteStr1}`
    let websiteContent2 = `${(this.props.website.currentCustomer.website == '') ? '' : websiteStr2}`

    let pastDueStr1 = 'Past due: '
    let pastDueStr2 = this.props.website.currentCustomer.website
    let pastDueContent1 = `${(this.props.website.currentCustomer.pastDue == '') ? '' : pastDueStr1}`
    let pastDueContent2 = `${(this.props.website.currentCustomer.pastDue == '') ? '' : pastDueStr2}`

    let billAddressStr1 = 'Address Line 2: '
    let billAddressStr2 = this.props.website.currentCustomer.shipAddr2
    let billAddressContent1 = `${(this.props.website.currentCustomer.shipAddr.shipAddr2 == null) ? '' : billAddressStr1}`
    let billAddressContent2 = `${(this.props.website.currentCustomer.shipAddr.shipAddr2 == null) ? '' : billAddressStr2}`

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-2"><strong>{'ID: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.id}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'Company Name: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.companyName}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'Phone Number: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.phone}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'Email: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.email}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{websiteContent1}</strong></div>
            <div className="col-lg-6">{websiteContent2}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'Address: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.shipAddr.shipAddr1}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{billAddressContent1}</strong></div>
            <div className="col-lg-6">{billAddressContent2}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'City: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.shipAddr.shipCity}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'State: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.shipAddr.shipState}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'Zip Code: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.shipAddr.shipZip}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'Country: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.shipAddr.shipCountry}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{'Bill Address: '}</strong></div>
            <div className="col-lg-6">{this.props.website.currentCustomer.formattedBillAddress}</div>
          </div>
          <div className="row">
            <div className="col-sm-2"><strong>{pastDueContent1}</strong></div>
            <div className="col-lg-6">{pastDueContent2}</div>
          </div>
        </div>
        <br></br>
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
