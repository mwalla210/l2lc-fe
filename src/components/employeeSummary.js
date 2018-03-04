import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {Button} from 'react-bootstrap'
import DeleteModal from './deleteModal'
import ModalModel from '../models/modalModel'

@inject ('website', 'page') @observer
export default class EmployeeSummary extends Component {
  constructor(props){
    super(props)
    this.props.page.setModal(new ModalModel(() => console.log('confirm')))
  }

  render() {
    return (
      <div>
        <DeleteModal
          title="Delete Employee?"
          confirmOnClick={this.props.page.modal.confirmAndClose}
          denyOnClick={this.props.page.modal.closeModal}
          open={this.props.page.modal.modalOpen}
          closeFn={this.props.page.modal.closeModal}
          content="This action cannot be undone."
        />
       <p>First Name: {this.props.website.currentEmployee.firstName}</p>
       <p>Last Name: {this.props.website.currentEmployee.lastName}</p>
       <Barcode
        imageDomID={this.props.website.currentEmployee.barcodeDomID}
        barcodeID={this.props.website.currentEmployee.barcodeScanID}
       />
       <br/>
       <Button style={{marginLeft: 5}} className="btn btn-default" onClick={this.props.page.employeeEditPage}>Edit</Button>
       <Button style={{marginLeft: 5}} className="btn btn-danger" onClick={this.props.page.modal.openModal}>Delete</Button>
      </div>
    )
  }
}
