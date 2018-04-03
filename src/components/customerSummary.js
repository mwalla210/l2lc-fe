import React, {Component} from 'react'
import { inject } from 'mobx-react'
import {DropdownButton, MenuItem, ButtonToolbar, ButtonGroup} from 'react-bootstrap'

/**
 * CustomerSummary component
 * @namespace CustomerSummary
 * @extends React.Component
 */
@inject ('website', 'page')
export default class CustomerSummary extends Component {
  /**
   * Renders HTML div component, containing customer details and buttons
   * @method render
   * @memberof CustomerSummary.prototype
   * @return {Component}
   */
  render() {
    let websiteStr = this.props.website.currentCustomer.website
    let websiteContent = `${(websiteStr == '') ? '' : websiteStr}`

    let pastDueStr = this.props.website.currentCustomer.pastDue
    let pastDueContent = `${(pastDueStr == '') ? '' : pastDueStr}`

    let shipAddressStr = this.props.website.currentCustomer.shipAddr.shipAddr2
    let shipAddressContent = `${(shipAddressStr == null) ? '' : shipAddressStr}`

    let shipAddressStateStr = this.props.website.currentCustomer.shipAddr.shipState
    let shipAddressStateContent = `${(shipAddressStateStr == null) ? '' : shipAddressStateStr}`

    let billAddressStr = this.props.website.currentCustomer.billAddressLine2
    let billAddressContent = `${(billAddressStr == null) ? '' : billAddressStr}`

    let billAddressStateStr = this.props.website.currentCustomer.billAddressState
    let billAddressStateContent = `${(billAddressStateStr == null) ? '' : billAddressStateStr}`

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
                {(shipAddressStateStr) ?
                <div className="row">
                  <div className="col-sm-3"><strong>{'State: '}</strong></div>
                  <div className="col-sm-6">{shipAddressStateContent}</div>
                </div> : null
              }
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
                {(billAddressStateStr) ?
                <div className="row">
                  <div className="col-sm-3"><strong>{'State: '}</strong></div>
                  <div className="col-sm-6">{billAddressStateContent}</div>
                </div> : null
              }
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
