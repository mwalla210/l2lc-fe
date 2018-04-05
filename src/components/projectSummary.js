import React, {Component} from 'react'
import { inject } from 'mobx-react'
import Barcode from './barcode'
import {DropdownButton, MenuItem, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import DeleteModal from './deleteModal'
import FieldModal from './fieldModal'
import PromptModal from './promptModal'
import ButtonDefault from './buttonDefault'

/**
 * ProjectSummary component; constructor binds functions
 * @namespace ProjectSummary
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject ('website', 'page')
export default class ProjectSummary extends Component {
  constructor(props){
    super(props)
    this.reworkClick = this.reworkClick.bind(this)
    this.holdClick = this.holdClick.bind(this)
    this.resetAndOpenModal = this.resetAndOpenModal.bind(this)
    this.tasksClick = this.tasksClick.bind(this)
    this.printClick = this.printClick.bind(this)
    this.timeEntries = this.timeEntries.bind(this)
  }

  /**
   * On click handler for rework button
   * @method reworkClick
   * @memberof ProjectSummary.prototype
   */
  reworkClick(){
    this.props.page.summaryModel.fieldModal.changeTitle('Add Rework')
    this.props.page.summaryModel.fieldModal.changeConfirmFn((content) => console.log('Rework', content))
    this.resetAndOpenModal()
  }

  /**
   * On click handler for hold button
   * @method holdClick
   * @memberof ProjectSummary.prototype
   */
  holdClick(){
    let title = 'Add Hold'
    if (this.props.website.currentProject.hold.flag)
      title = 'Remove Hold'
    this.props.page.summaryModel.fieldModal.changeTitle(title)
    this.props.page.summaryModel.fieldModal.changeConfirmFn((content) => console.log('Hold', content))
    this.resetAndOpenModal()
  }

  /**
   * Resets modal content and opens modal
   * @method resetAndOpenModal
   * @memberof ProjectSummary.prototype
   */
  resetAndOpenModal(){
    this.props.page.summaryModel.fieldModal.changeContent('')
    this.props.page.summaryModel.fieldModal.openModal()
  }

  /**
   * On click handler for tasks button
   * @method tasksClick
   * @memberof ProjectSummary.prototype
   */
  tasksClick(){
    console.log('Tasks')
  }

  /**
   * On click handler for print button
   * @method printClick
   * @memberof ProjectSummary.prototype
   */
  printClick(){
    // eslint-disable-next-line no-undef
    window.print()
  }

  /**
   * On click handler for time entry button
   * @method timeEntries
   * @memberof ProjectSummary.prototype
   */
  timeEntries(){
    console.log('Time Entry table')
  }

  /**
   * Renders HTML div component containing FieldModal, DeleteModal, PromptModal, project info, project barcode, and project buttons
   * @method render
   * @memberof ProjectSummary.prototype
   * @return {Component}
   * @see {@link http://lindell.me/JsBarcode/ JsBarcode}
   * @see {@link FieldModal}
   * @see {@link DeleteModal}
   * @see {@link PromptModal}
   */
  render() {
    return (
      <div>
        <FieldModal
          title={this.props.page.summaryModel.fieldModal.title}
          submitButton={{
            title: 'Submit',
            onClick: this.props.page.summaryModel.fieldModal.confirmAndClose
          }}
          open={this.props.page.summaryModel.fieldModal.modalOpen}
          closeFn={this.props.page.summaryModel.fieldModal.closeModal}
          onChangeFn={this.props.page.summaryModel.fieldModal.changeContent}
          contents={this.props.page.summaryModel.fieldModal.contents}
        />
        <DeleteModal
          title="Delete Project?"
          confirmOnClick={this.props.page.summaryModel.deleteModal.confirmAndClose}
          denyOnClick={this.props.page.summaryModel.deleteModal.closeModal}
          open={this.props.page.summaryModel.deleteModal.modalOpen}
          closeFn={this.props.page.summaryModel.deleteModal.closeModal}
          content="This action cannot be undone."
        />
        <PromptModal
          title="Complete Project?"
          confirmOnClick={this.props.page.summaryModel.completeModal.confirmAndClose}
          denyOnClick={this.props.page.summaryModel.completeModal.closeModal}
          open={this.props.page.summaryModel.completeModal.modalOpen}
          closeFn={this.props.page.summaryModel.completeModal.closeModal}
          content="This action cannot be undone."
          confirmClass="btn-primary"
        />
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <h4 style={{textAlign: 'center'}}>{this.props.website.currentProject.title}</h4>
            <div className="row">
              <div className="col-sm-12 col-sm-offset-2">
                <div className="row">
                  <div className="col-sm-6"><strong>{'ID: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.id}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{'Cost Center: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.costCenterTitle}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{'Project Type: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.jobTypeTitle}</div>
                </div>
                {this.props.website.currentProject.customer.companyName &&
                  <div className="row">
                    <div className="col-sm-6"><strong>{'Customer Name: '}</strong></div>
                    <div className="col-sm-6">{this.props.website.currentProject.customer.companyName}</div>
                  </div>
                }
                <div className="row">
                  <div className="col-sm-6"><strong>{'Priority: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.priority}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{'Status: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.status}</div>
                </div>
                {this.props.website.currentProject.timeSpent &&
                  <div className="row">
                    <div className="col-sm-6"><strong>{'Time Spent: '}</strong></div>
                    <div className="col-sm-6">{this.props.website.currentProject.timeSpent}</div>
                  </div>
                }
                {this.props.website.currentProject.partCount &&
                  <div className="row">
                    <div className="col-sm-6"><strong>{'Part Count: '}</strong></div>
                    <div className="col-sm-6">{this.props.website.currentProject.partCount}</div>
                  </div>
                }
                {this.props.website.currentProject.descr &&
                  <div className="row">
                    <div className="col-sm-6"><strong>{'Description: '}</strong></div>
                    <div className="col-sm-6">{this.props.website.currentProject.descr}</div>
                  </div>
                }
                {this.props.website.currentProject.refNum &&
                  <div className="row">
                    <div className="col-sm-6"><strong>{'Reference Number: '}</strong></div>
                    <div className="col-sm-6">{this.props.website.currentProject.refNum}</div>
                  </div>
                }
              </div>
            </div>
            <div style={{textAlign: 'center'}}>
              <Barcode
               imageDomID={this.props.website.currentProject.barcodeDomID}
               barcodeID={this.props.website.currentProject.barcodeScanID}
              />
              <br/>
              <br/>
              <ButtonToolbar>
                <ButtonGroup style={{float: 'inherit'}}>
                  <DropdownButton bsStyle="info" title="More..." id="dropdown-info">
                    <MenuItem onSelect={this.tasksClick}>Tasks</MenuItem>
                    <MenuItem onSelect={this.timeEntries}>Time Entries</MenuItem>
                  </DropdownButton>
                </ButtonGroup>
                <ButtonGroup style={{float: 'inherit'}}>
                  <DropdownButton bsStyle="primary" title="Actions..." id="dropdown-primary">
                    <MenuItem onSelect={this.reworkClick}>Add Rework</MenuItem>
                    <MenuItem onSelect={this.holdClick}>{`${(this.props.website.currentProject.hold.flag) ? 'Remove' : 'Add'} Hold`}</MenuItem>
                    <MenuItem onSelect={this.props.page.projectEditPage}>Edit Details</MenuItem>
                    {(this.props.website.currentProject.customer.id) ? <MenuItem onSelect={this.props.page.changeCustomerPage}>Edit Customer</MenuItem> : null}
                    <MenuItem onSelect={this.props.page.summaryModel.completeModal.openModal}>Complete</MenuItem>
                    <MenuItem onSelect={this.props.page.summaryModel.deleteModal.openModal}>Delete</MenuItem>
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
    )
  }
}
