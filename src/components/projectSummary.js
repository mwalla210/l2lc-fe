import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {DropdownButton, MenuItem, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import DeleteModal from './deleteModal'
import FieldModal from './fieldModal'
import PromptModal from './promptModal'
import ButtonDefault from './buttonDefault'

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

  reworkClick(){
    this.props.page.summaryModel.fieldModal.changeTitle('Add Rework')
    this.props.page.summaryModel.fieldModal.changeConfirmFn((content) => console.log('Rework', content))
    this.resetAndOpenModal()
  }

  holdClick(){
    let title = 'Add Hold'
    if (this.props.website.currentProject.hold.flag)
      title = 'Remove Hold'
    this.props.page.summaryModel.fieldModal.changeTitle(title)
    this.props.page.summaryModel.fieldModal.changeConfirmFn((content) => console.log('Hold', content))
    this.resetAndOpenModal()
  }

  resetAndOpenModal(){
    this.props.page.summaryModel.fieldModal.changeContent('')
    this.props.page.summaryModel.fieldModal.openModal()
  }

  tasksClick(){
    console.log('Tasks')
  }

  printClick(){
    // eslint-disable-next-line no-undef
    window.print()
  }

  timeEntries(){
    console.log('Time Entry table')
  }

  render() {
    let holdStr = `${(this.props.website.currentProject.hold.flag) ? 'Remove' : 'Add'} Hold`
    let projectTitleContent = `${(this.props.website.currentProject.title == '') ? '' : this.props.website.currentProject.title}`

    let custNameStr = this.props.website.currentProject.customer.companyName
    let custNameContent = `${(custNameStr) ? custNameStr : ''}`

    let timeSpentStr = this.props.website.currentProject.timeSpent
    let timeSpentContent = `${(timeSpentStr == '') ? '' : timeSpentStr}`

    let partCountStr = this.props.website.currentProject.partCount
    let partCountContent = `${(partCountStr == '') ? '' : partCountStr}`

    let descrStr = this.props.website.currentProject.descr
    let descrStrContent = `${(descrStr == '') ? '' : descrStr}`

    let refNumStr = this.props.website.currentProject.refNum
    let refNumContent = `${(refNumStr == '') ? '' : refNumStr}`

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
            <h4 style={{textAlign: 'center'}}>{projectTitleContent}</h4>
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
                {(custNameStr) ?
                <div className="row">
                  <div className="col-sm-6"><strong>{'Customer Name: '}</strong></div>
                  <div className="col-sm-6">{custNameContent}</div>
                </div> : null
              }
                <div className="row">
                  <div className="col-sm-6"><strong>{'Priority: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.priority}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{'Status: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.status}</div>
                </div>
                {(timeSpentStr) ?
                <div className="row">
                  <div className="col-sm-6"><strong>{'Time Spent: '}</strong></div>
                  <div className="col-sm-6">{timeSpentContent}</div>
                </div> : null
              }
                {(partCountStr) ?
                <div className="row">
                  <div className="col-sm-6"><strong>{'Part Count: '}</strong></div>
                  <div className="col-sm-6">{partCountContent}</div>
                </div> : null
              }
                {(descrStr) ?
                <div className="row">
                  <div className="col-sm-6"><strong>{'Description: '}</strong></div>
                  <div className="col-sm-6">{descrStrContent}</div>
                </div> : null
              }
                {(refNumStr) ?
                  <div className="row">
                    <div className="col-sm-6"><strong>{'Reference Number: '}</strong></div>
                    <div className="col-sm-6">{refNumContent}</div>
                  </div> : null
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
                    <MenuItem onSelect={this.holdClick}>{holdStr}</MenuItem>
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
