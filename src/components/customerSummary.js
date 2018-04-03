import React, {Component} from 'react'
import { inject } from 'mobx-react'
import {DropdownButton, MenuItem, ButtonToolbar, ButtonGroup} from 'react-bootstrap'

@inject ('website', 'page')
export default class CustomerSummary extends Component {
  render() {
    let websiteStr = this.props.website.currentCustomer.website
    let websiteContent = `${(this.props.website.currentCustomer.website == '') ? '' : websiteStr}`

    let pastDueStr = this.props.website.currentCustomer.pastDue
    let pastDueContent = `${(this.props.website.currentCustomer.pastDue == '') ? '' : pastDueStr}`

    let shipAddressStr = this.props.website.currentCustomer.shipAddr2
    let shipAddressContent = `${(this.props.website.currentCustomer.shipAddr.shipAddr2 == null) ? '' : shipAddressStr}`

    let billAddressStr = this.props.website.currentCustomer.billAddressLine2
    let billAddressContent = `${(this.props.website.currentCustomer.billAddressLine2 == null) ? '' : billAddressStr}`

    return (
    <div>
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <h4 style={{textAlign: 'center'}}>{this.props.website.currentCustomer.companyName}</h4>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-3">
                <div className="row">
                  <div className="col-sm-3"><strong>{'ID: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.id}</div>
                </div>
                <div className="row">
                  <div className="col-sm-3"><strong>{'Phone Number: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.phone}</div>
                </div>
                <div className="row">
                  <div className="col-sm-3"><strong>{'Email: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.email}</div>
                </div>
                {(websiteStr) ?
                <div className="row">
                  <div className="col-sm-3"><strong>{'Website: '}</strong></div>
                  <div className="col-sm-6">{websiteContent}</div>
                </div> : null
              }
                {(pastDueStr) ?
                <div className="row">
                  <div className="col-sm-3"><strong>{'Past due: '}</strong></div>
                  <div className="col-sm-6">{pastDueContent}</div>
                </div> : null
              }
              </div>
            </div>
            <br/>
            <h4 style={{textAlign: 'center'}}>{'Shipping Info'}</h4>
            <div className="row">
              <div className="col-lg-12 col-lg-offset-3">
                <div className="row">
                  <div className="col-sm-3"><strong>{'Address: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.shipAddr.shipAddr1}</div>
                </div>
                {(shipAddressStr) ?
                <div className="row">
                  <div className="col-sm-3"><strong>{'Address Line 2: '}</strong></div>
                  <div className="col-sm-6">{shipAddressContent}</div>
                </div> : null
              }
                <div className="row">
                  <div className="col-sm-3"><strong>{'City: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.shipAddr.shipCity}</div>
                </div>
                <div className="row">
                  <div className="col-sm-3"><strong>{'State: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.shipAddr.shipState}</div>
                </div>
                <div className="row">
                  <div className="col-sm-3"><strong>{'Zip Code: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.shipAddr.shipZip}</div>
                </div>
                <div className="row">
                  <div className="col-sm-3"><strong>{'Country: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.shipAddr.shipCountry}</div>
                </div>
              </div>
            </div>
            <br/>
            <h4 style={{textAlign: 'center'}}>{'Billing Info'}</h4>
            <div className="row">
              <div className="col-lg-12 col-lg-offset-3">
                <div className="row">
                  <div className="col-sm-3"><strong>{'Address: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.billAddressLine1}</div>
                </div>
                {(billAddressStr) ?
                <div className="row">
                  <div className="col-sm-3"><strong>{'Address Line 2: '}</strong></div>
                  <div className="col-sm-6">{billAddressContent}</div>
                </div> : null
              }
                <div className="row">
                  <div className="col-sm-3"><strong>{'City: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.billAddressCity}</div>
                </div>
                <div className="row">
                  <div className="col-sm-3"><strong>{'State: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.billAddressState}</div>
                </div>
                <div className="row">
                  <div className="col-sm-3"><strong>{'Zip Code: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.billAddressZip}</div>
                </div>
                <div className="row">
                  <div className="col-sm-3"><strong>{'Country: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentCustomer.billAddressCountry}</div>
                </div>
                <br/>
                <br/>
                </div>
                <div style={{textAlign: 'center'}}>
                <ButtonToolbar>
                  <ButtonGroup style={{float: 'inherit'}}>
                    <DropdownButton bsStyle="info" title="More..." id="dropdown-info">
                      <MenuItem onSelect={console.log('See customer projects')}>Projects</MenuItem>
                    </DropdownButton>
                  </ButtonGroup>
                  <ButtonGroup style={{float: 'inherit'}}>
                    <DropdownButton bsStyle="primary" title="Actions" id="dropdown-primary">
                      <MenuItem onSelect={this.props.page.customerEditPage}>Edit</MenuItem>
                    </DropdownButton>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
