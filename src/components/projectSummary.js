import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Barcode from './barcode'
import {Button} from 'react-bootstrap'
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

  render() {
    return (
      <div style={{marginLeft:'30%'}}>
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
        <Button style = {{marginRight:'3'}} className="btn btn-default" onClick={this.tasksClick}>Tasks</Button>
        <Button style = {{marginRight:'3'}} className="btn btn-default" onClick={this.props.page.projectEditPage}>Edit</Button>
        <Button style = {{marginRight:'3'}} className="btn btn-default" onClick={this.reworkClick}>Add Rework</Button>
        <Button style = {{marginRight:'3'}} className="btn btn-default" onClick={this.holdClick}>{(this.props.website.currentProject.hold.flag) ? 'Remove Hold' : 'Add Hold'}</Button>
        <Button style = {{marginRight:'3'}} className="btn btn-default" onClick={this.printClick}>Print</Button>
        <Button style = {{marginRight:'3'}} className="btn btn-primary" onClick={this.props.page.summaryModel.completeModal.openModal}>Complete</Button>
        <Button style = {{marginRight:'3'}} className="btn btn-danger" onClick={this.props.page.summaryModel.deleteModal.openModal}>Delete</Button>
      </div>
    )
  }
}
