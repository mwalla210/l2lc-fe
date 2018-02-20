import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import JsBarcode from 'jsbarcode'

@inject ('website') @observer
export default class EmployeeSummary extends Component {
  render() {
    return (
      <div>
       <p>First Name: {this.props.website.currentEmployee.firstName}</p>
       <p>Last Name: {this.props.website.currentEmployee.lastName}</p>
        <img
          onLoad={() => JsBarcode(`#${this.props.website.currentEmployee.firstName}${this.props.website.currentEmployee.id}`, `${this.props.website.currentEmployee.id}`)}
          id={`${this.props.website.currentEmployee.firstName}${this.props.website.currentEmployee.id}`}
          src="../../style/open-iconic-master/svg/image.svg"
          alt="image"
        />
      </div>
    )
  }
}
