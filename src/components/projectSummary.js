import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {Button, DropdownButton, MenuItem, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import DeleteModal from './deleteModal'
import FieldModal from './fieldModal'
import PromptModal from './promptModal'

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
    this.changeCust = this.changeCust.bind(this)
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
    console.log('Print')
  }

  timeEntries(){
    console.log('Time Entry table')
  }

  changeCust(){
    console.log('Customer change')
  }

  render() {
    let holdStr = `${(this.props.website.currentProject.hold.flag) ? 'Remove' : 'Add'} Hold`
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
        />
        <p>{`ID: ${this.props.website.currentProject.id}`}</p>
        <p>{`Cost Center: ${this.props.website.currentProject.costCenterTitle}`}</p>
        <p>{`Project Type: ${this.props.website.currentProject.jobTypeTitle}`}</p>
        <p>{`Project Title: ${this.props.website.currentProject.title}`}</p>
        <p>{`Customer (TODO in model): ${this.props.website.currentProject.customer}`}</p>
        <p>{`Priority: ${this.props.website.currentProject.priority}`}</p>
        <p>{`Status: ${this.props.website.currentProject.status}`}</p>
        <p>{`Total time spent:${this.props.website.currentProject.timeSpent}`}</p>
        <p>{`Part Count: ${this.props.website.currentProject.partCount}`}</p>
        <p>{`Description: ${this.props.website.currentProject.descr}`}</p>
        <p>{`Reference Number: ${this.props.website.currentProject.refNum}`}</p>
        <Barcode
         imageDomID={this.props.website.currentProject.barcodeDomID}
         barcodeID={this.props.website.currentProject.barcodeScanID}
        />
        <br/>
        <ButtonToolbar>
          <ButtonGroup>
            <DropdownButton bsStyle="info" title="More..." id="dropdown-info">
              <MenuItem onSelect={this.tasksClick}>Tasks</MenuItem>
              <MenuItem onSelect={this.timeEntries}>Time Entries</MenuItem>
            </DropdownButton>
          </ButtonGroup>
          <ButtonGroup>
            <DropdownButton bsStyle="primary" title="Actions..." id="dropdown-primary">
              <MenuItem onSelect={this.reworkClick}>Add Rework</MenuItem>
              <MenuItem onSelect={this.holdClick}>{holdStr}</MenuItem>
              <MenuItem onSelect={this.props.page.projectEditPage}>Edit Details</MenuItem>
              <MenuItem onSelect={this.changeCust}>Edit Customer</MenuItem>
              <MenuItem onSelect={this.props.page.summaryModel.completeModal.openModal}>Complete</MenuItem>
              <MenuItem onSelect={this.props.page.summaryModel.deleteModal.openModal}>Delete</MenuItem>
            </DropdownButton>
          </ButtonGroup>
          <ButtonGroup>
            <Button type="button" className="btn btn-default" onClick={this.printClick}>Print</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}
