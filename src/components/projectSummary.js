import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {ButtonGroup, DropdownItem, DropdownMenu, ButtonDropdown, DropdownToggle} from 'reactstrap'
import DeleteModal from './deleteModal'
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
    this.tasksClick = this.tasksClick.bind(this)
    this.printClick = this.printClick.bind(this)
    this.timeEntries = this.timeEntries.bind(this)
    this.customer = this.customer.bind(this)
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
    this.props.page.projectTimeEntryPage()
  }

  /**
   * On click handler for time entry button
   * @method customer
   * @memberof ProjectSummary.prototype
   */
  customer(){
    this.props.website.setCustomer(this.props.website.currentProject.customer)
    this.props.page.customerSummaryPage()
  }

  /**
   * Renders HTML div component containing DeleteModal, PromptModal, project info, project barcode, and project buttons
   * @method render
   * @memberof ProjectSummary.prototype
   * @return {Component}
   * @see {@link Barcode}
   * @see {@link DeleteModal}
   * @see {@link PromptModal}
   * @see {@link ButtonDefault}
   * @see {@link Consts}
   * @see {@link https://reactstrap.github.io/components/button-group/ Reactstrap.ButtonGroup}
   */
  render() {
    return (
      <div>
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
                <h6>Description</h6>
                <p>{this.props.website.currentProject.title}</p>
              </div>
            }
            <div>
              <h6>Priority</h6>
              <p><span>
                <img
                  src={`../../style/open-iconic-master/svg/${(this.props.website.currentProject.priority == '1-2 Days') ? 'clock' : 'calendar'}.svg`}
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
            {this.props.website.currentProject.dateCreated &&
              <div>
                <h6>Date Created</h6>
                <p>{this.props.website.currentProject.dateCreated.toString()}</p>
              </div>
            }
            {this.props.website.currentProject.dateFinished &&
              <div>
                <h6>Date Finished</h6>
                <p>{this.props.website.currentProject.dateFinished.toString()}</p>
              </div>
            }
            {this.props.website.currentProject.timeSpent &&
              <div>
                <h6>Time Spent</h6>
                <p>{this.props.website.currentProject.timeSpent}</p>
              </div>
            }
            {this.props.website.currentProject.partCount != null &&
              <div>
                <h6>Part Count</h6>
                <p>{this.props.website.currentProject.partCount}</p>
              </div>
            }
            {this.props.website.currentProject.descr &&
              <div>
                <h6>Details</h6>
                <p>{this.props.website.currentProject.descr}</p>
              </div>
            }
            {this.props.website.currentProject.refNum &&
              <div>
                <h6>Job/Work Order Number</h6>
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
                {this.props.website.currentProject.customer.companyName &&
                  <DropdownItem onClick={this.customer}>Customer</DropdownItem>
                }
              </DropdownMenu>
            </ButtonDropdown>
            <ButtonDropdown
              isOpen={this.props.website.summaryActionsDropdownOpen}
              toggle={this.props.website.toggleSummaryActionsDD}
            >
              <DropdownToggle color="primary" caret>Actions</DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={this.props.page.projectEditPage}
                  disabled={this.props.website.currentProject.status == 'Completed'}
                >
                  Edit Details
                </DropdownItem>
                {this.props.website.currentProject.customer.id &&
                  <DropdownItem
                    onClick={this.props.page.changeCustomerPage}
                    disabled={this.props.website.currentProject.status == 'Completed'}
                  >
                    Edit Customer
                  </DropdownItem>
                }
                <DropdownItem
                  onClick={this.props.page.summaryModel.completeModal.openModal}
                  disabled={this.props.website.currentProject.status == 'Completed'}
                >
                  Complete
                </DropdownItem>
                {this.props.website.currentUser.admin &&
                  <DropdownItem
                    onClick={this.props.page.summaryModel.deleteModal.openModal}
                  >
                    Delete
                  </DropdownItem>
                }
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}
