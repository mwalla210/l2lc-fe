import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup} from 'reactstrap'
// import DeleteModal from './deleteModal'
import ButtonDefault from './buttonDefault'
import Consts from '../consts'

/**
 * EmployeeSummary component
 * @namespace EmployeeSummary
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject ('website', 'page') @observer
export default class EmployeeSummary extends Component {
  /**
   * Opens window print dialog
   * @method printClick
   * @memberof EmployeeSummary.prototype
   */
  printClick(){
    // eslint-disable-next-line no-undef
    window.print()
  }

  /**
   * Renders HTML div component, containing employee name, barcode, and buttons
   * @method render
   * @memberof EmployeeSummary.prototype
   * @return {Component}
   * @see {@link https://reactstrap.github.io/components/button-group/ Reactstrap.ButtonGroup}
   * @see {@link Barcode}
   */
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
        <div className="row justify-content-center">
          <div>
            <div>
              <h3>{'ID: ' + this.props.website.currentEmployee.id}</h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <Barcode
           imageDomID={this.props.website.currentEmployee.barcodeDomID}
           barcodeID={this.props.website.currentEmployee.barcodeScanID}
          />
        </div>
        <div className="row justify-content-center">
          <ButtonGroup>
            <ButtonDefault className="btn-outline-secondary" onClick={this.printClick} text="Print"/>
            <ButtonDropdown isOpen={this.props.website.summaryActionsDropdownOpen} toggle={this.props.website.toggleSummaryActionsDD}>
              <DropdownToggle color="primary" caret>Actions</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.props.page.employeeEditPage}>Edit</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}
