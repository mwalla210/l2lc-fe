import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {Button, DropdownButton, MenuItem, ButtonToolbar, ButtonGroup, Grid} from 'react-bootstrap'
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

    let custNameStr1 = 'Customer Name: '
    let custNameStr2 = this.props.website.currentProject.customer.name
    let custNameContent1 = `${(this.props.website.currentProject.customer.id) ? custNameStr1 : ''}`
    let custNameContent2 = `${(this.props.website.currentProject.customer.id) ? custNameStr2 : ''}`

    let timeSpentStr1 = 'Time Spent: '
    let timeSpentStr2 = this.props.website.currentProject.timeSpent
    let timeSpentContent1 = `${(this.props.website.currentProject.timeSpent == '') ? '' : timeSpentStr1}`
    let timeSpentContent2 = `${(this.props.website.currentProject.timeSpent == '') ? '' : timeSpentStr2}`

    let partCountStr1 = 'Part Count: '
    let partCountStr2 = this.props.website.currentProject.partCount
    let partCountContent1 = `${(this.props.website.currentProject.partCount == null) ? '' : partCountStr1}`
    let partCountContent2 = `${(this.props.website.currentProject.partCount == null) ? '' : partCountStr2}`

    let descrStr1 = 'Description: '
    let descrStr2 = this.props.website.currentProject.descr
    let descrStrContent1 = `${(this.props.website.currentProject.descr == '') ? '' : descrStr1}`
    let descrStrContent2 = `${(this.props.website.currentProject.descr == '') ? '' : descrStr2}`

    let refNumStr1 = 'Reference Number: '
    let refNumStr2 = this.props.website.currentProject.refNum
    let refNumContent1 = `${(this.props.website.currentProject.refNum == '') ? '' : refNumStr1}`
    let refNumContent2 = `${(this.props.website.currentProject.refNum == '') ? '' : refNumStr2}`

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
                <div className="row">
                  <div className="col-sm-6"><strong>{custNameContent1}</strong></div>
                  <div className="col-sm-6">{custNameContent2}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{'Priority: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.priority}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{'Status: '}</strong></div>
                  <div className="col-sm-6">{this.props.website.currentProject.status}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{timeSpentContent1}</strong></div>
                  <div className="col-sm-6">{timeSpentContent2}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{partCountContent1}</strong></div>
                  <div className="col-sm-6">{partCountContent2}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{descrStrContent1}</strong></div>
                  <div className="col-sm-6">{descrStrContent2}</div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><strong>{refNumContent1}</strong></div>
                  <div className="col-sm-6">{refNumContent2}</div>
                </div>
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
                  <Button type="button" className="btn btn-default" onClick={this.printClick}>Print</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
