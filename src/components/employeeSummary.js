import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {Button} from 'react-bootstrap'
import DeleteModal from './deleteModal'

@inject ('website', 'page') @observer
export default class EmployeeSummary extends Component {

  render() {
    return (
      <div>
        <DeleteModal
          title="Delete Employee?"
          confirmOnClick={this.props.page.summaryModel.deleteModal.confirmAndClose}
          denyOnClick={this.props.page.summaryModel.deleteModal.closeModal}
          open={this.props.page.summaryModel.deleteModal.modalOpen}
          closeFn={this.props.page.summaryModel.deleteModal.closeModal}
          content="This action cannot be undone."
        />
       <p>First Name: {this.props.website.currentEmployee.firstName}</p>
       <p>Last Name: {this.props.website.currentEmployee.lastName}</p>
       <Barcode
        imageDomID={this.props.website.currentEmployee.barcodeDomID}
        barcodeID={this.props.website.currentEmployee.barcodeScanID}
       />
       <br/>
       <Button style = {{marginRight:'3'}} className="btn btn-default" onClick={this.props.page.employeeEditPage}>Edit</Button>
       <Button style = {{marginRight:'3'}} className="btn btn-danger" onClick={this.props.page.summaryModel.deleteModal.openModal}>Delete</Button>
      </div>
    )
  }
}
