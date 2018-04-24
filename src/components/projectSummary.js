import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {ButtonGroup, DropdownItem, DropdownMenu, ButtonDropdown, DropdownToggle} from 'reactstrap'
import DeleteModal from './deleteModal'
import FieldModal from './fieldModal'
import PromptModal from './promptModal'
import ButtonDefault from './buttonDefault'
import Consts from '../consts'

/**
 * ProjectSummary component; constructor binds functions
 * @namespace ProjectSummary
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject ('website', 'page') @observer
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
    this.props.page.projectTaskList()
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
   * @see {@link Barcode}
   * @see {@link FieldModal}
   * @see {@link DeleteModal}
   * @see {@link PromptModal}
   * @see {@link https://reactstrap.github.io/components/button-group/ Reactstrap.ButtonGroup}
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
        <div className="row justify-content-center">
          <div {...Consts.summaryProps}>
            <h5>Main Information</h5>
            {this.props.website.currentProject.title &&
              <div>
                <h6>Title</h6>
                <p>{this.props.website.currentProject.title}</p>
              </div>
            }
            <div>
              <h6>Priority</h6>
              <p><span>
                <img
                  src={`../../style/open-iconic-master/svg/${(this.props.website.currentProject.priority == 'Low') ? 'arrow-bottom' : 'arrow-top'}.svg`}
                  style={{width: '13px'}}
                />
                {` ${this.props.website.currentProject.priority}`}
              </span></p>
            </div>
            <div>
              <h6>Status</h6>
              <p><span>
                <span style={{
                  color: this.props.website.currentProject.status === 'Completed' ? Consts.doneColor
                    : this.props.website.currentProject.status === 'On Hold' ? Consts.helpColor
                    // Received, In Progress
                    : Consts.openColor,
                  transition: 'all .3s ease'}}>
                    &#x25cf;
                </span>
                {` ${this.props.website.currentProject.status}`}
              </span></p>
            </div>
            <div>
              <h6>Cost Center</h6>
              <p>{this.props.website.currentProject.costCenterTitle}</p>
            </div>
            <div>
              <h6>Project Type</h6>
              <p>{this.props.website.currentProject.jobTypeTitle}</p>
            </div>
          </div>
          <div {...Consts.summaryProps}>
            <h5>Additional Information</h5>
            {this.props.website.currentProject.customer.companyName &&
              <div>
                <h6>Customer Name</h6>
                <p>{this.props.website.currentProject.customer.companyName}</p>
              </div>
            }
            {this.props.website.currentProject.timeSpent &&
              <div>
                <h6>Time Spent</h6>
                <p>{this.props.website.currentProject.timeSpent}</p>
              </div>
            }
            {this.props.website.currentProject.partCount &&
              <div>
                <h6>Part Count</h6>
                <p>{this.props.website.currentProject.partCount}</p>
              </div>
            }
            {this.props.website.currentProject.descr &&
              <div>
                <h6>Description</h6>
                <p>{this.props.website.currentProject.descr}</p>
              </div>
            }
            {this.props.website.currentProject.refNum &&
              <div className="row justify-content-center">
                <h6>Reference Number</h6>
                <p>{this.props.website.currentProject.refNum}</p>
              </div>
            }
          </div>
        </div>
        <div className="row justify-content-center">
          <Barcode
           imageDomID={this.props.website.currentProject.barcodeDomID}
           barcodeID={this.props.website.currentProject.barcodeScanID}
          />
        </div>
        <div className="row justify-content-center">
          <ButtonGroup>
            <ButtonDefault className="btn-outline-secondary" onClick={this.printClick} text="Print"/>
            <ButtonDropdown isOpen={this.props.website.summaryMoreDropdownOpen} toggle={this.props.website.toggleSummaryMoreDD}>
              <DropdownToggle outline color="secondary" caret>More...</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.tasksClick}>Tasks</DropdownItem>
                <DropdownItem onClick={this.timeEntries}>Time Entries</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
            <ButtonDropdown isOpen={this.props.website.summaryActionsDropdownOpen} toggle={this.props.website.toggleSummaryActionsDD}>
              <DropdownToggle color="primary" caret>Actions</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.reworkClick}>Add Rework</DropdownItem>
                <DropdownItem onClick={this.holdClick}>{`${(this.props.website.currentProject.hold.flag) ? 'Remove' : 'Add'} Hold`}</DropdownItem>
                <DropdownItem onClick={this.props.page.projectEditPage}>Edit Details</DropdownItem>
                {this.props.website.currentProject.customer.id && <DropdownItem onClick={this.props.page.changeCustomerPage}>Edit Customer</DropdownItem>}
                <DropdownItem onClick={this.props.page.summaryModel.completeModal.openModal}>Complete</DropdownItem>
                <DropdownItem onClick={this.props.page.summaryModel.deleteModal.openModal}>Delete</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}
