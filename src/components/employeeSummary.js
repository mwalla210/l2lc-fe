import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import Barcode from './barcode'

@inject ('website') @observer
export default class EmployeeSummary extends Component {
  render() {
    return (
      <div>
       <p>First Name: {this.props.website.currentEmployee.firstName}</p>
       <p>Last Name: {this.props.website.currentEmployee.lastName}</p>
       <Barcode
        imageDomID={`${this.props.website.currentEmployee.firstName}${this.props.website.currentEmployee.id}`}
        barcodeID={this.props.website.currentEmployee.id.toString()}/>
      </div>
    )
  }
}
