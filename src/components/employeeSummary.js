import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {DropdownButton, MenuItem, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import DeleteModal from './deleteModal'
import ButtonDefault from './buttonDefault'

@inject ('website', 'page') @observer
export default class EmployeeSummary extends Component {

  printClick(){
    // eslint-disable-next-line no-undef
    window.print()
  }

  render() {
    /*
    <DeleteModal
      title="Delete Employee?"
      confirmOnClick={this.props.page.summaryModel.deleteModal.confirmAndClose}
      denyOnClick={this.props.page.summaryModel.deleteModal.closeModal}
      open={this.props.page.summaryModel.deleteModal.modalOpen}
      closeFn={this.props.page.summaryModel.deleteModal.closeModal}
      content="This action cannot be undone."
    />
    <MenuItem onSelect={this.props.page.summaryModel.deleteModal.openModal}>Delete</MenuItem>
     */
    return (
      <div>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <div className="row">
              <div className="col-lg-12 col-lg-offset-2">
                <div className="row">
                  <div className="col-sm-4"><strong>{'First Name: '}</strong></div>
                  <div className="col-sm-4">{this.props.website.currentEmployee.firstName}</div>
                </div>
                <div className="row">
                  <div className="col-sm-4"><strong>{'Last Name: '}</strong></div>
                  <div className="col-sm-4">{this.props.website.currentEmployee.lastName}</div>
                </div>
                <br/>
                </div>
                <div style={{textAlign: 'center'}}>
                 <Barcode
                  imageDomID={this.props.website.currentEmployee.barcodeDomID}
                  barcodeID={this.props.website.currentEmployee.barcodeScanID}
                 />
                 <br/>
                 <br/>
                 <ButtonToolbar>
                   <ButtonGroup style={{float: 'inherit'}}>
                     <DropdownButton bsStyle="primary" title="Actions" id="dropdown-primary">
                       <MenuItem onSelect={this.props.page.employeeEditPage}>Edit</MenuItem>
                     </DropdownButton>
                   </ButtonGroup>
                   <ButtonGroup style={{float: 'inherit'}}>
                     <ButtonDefault onClick={this.printClick} text="Print"/>
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
