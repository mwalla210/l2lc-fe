import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import {Button} from 'react-bootstrap'
import DeleteModal from './deleteModal'
import FieldModal from './fieldModal'
import ModalModel from '../models/modalModel'

@inject ('website', 'page') @observer
export default class ProjectSummary extends Component {
  constructor(props){
    super(props)
    this.props.page.setModal(new ModalModel(() => console.log('confirm')))
    this.props.page.setModalSecondary(new ModalModel(null, ''))
    this.reworkClick = this.reworkClick.bind(this)
    this.holdClick = this.holdClick.bind(this)
    this.resetAndOpenModal = this.resetAndOpenModal.bind(this)
    this.tasksClick = this.tasksClick.bind(this)
    this.printClick = this.printClick.bind(this)
  }

  reworkClick(){
    this.props.page.modalSecondary.changeTitle('Add Rework')
    this.props.page.modalSecondary.changeConfirmFn((content) => console.log('Rework', content))
    this.resetAndOpenModal()
  }

  holdClick(){
    let title = 'Add Hold'
    if (this.props.website.currentProject.hold.flag)
      title = 'Remove Hold'
    this.props.page.modalSecondary.changeTitle(title)
    this.props.page.modalSecondary.changeConfirmFn((content) => console.log('Hold', content))
    this.resetAndOpenModal()
  }

  resetAndOpenModal(){
    this.props.page.modalSecondary.changeContent('')
    this.props.page.modalSecondary.openModal()
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
          title={this.props.page.modalSecondary.title}
          submitButton={{
            title: 'Submit',
            onClick: this.props.page.modalSecondary.confirmAndClose
          }}
          open={this.props.page.modalSecondary.modalOpen}
          closeFn={this.props.page.modalSecondary.closeModal}
          onChangeFn={this.props.page.modalSecondary.changeContent}
          contents={this.props.page.modalSecondary.contents}
        />
        <DeleteModal
          title="Delete Project?"
          confirmOnClick={this.props.page.modal.confirmAndClose}
          denyOnClick={this.props.page.modal.closeModal}
          open={this.props.page.modal.modalOpen}
          closeFn={this.props.page.modal.closeModal}
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
        <Button style={{margin:3}} className="btn btn-default" onClick={this.tasksClick}>Tasks</Button>
        <Button style={{margin:3}} className="btn btn-default" onClick={this.props.page.projectEditPage}>Edit</Button>
        <Button style={{margin:3}} className="btn btn-default" onClick={this.reworkClick}>Add Rework</Button>
        <Button style={{margin:3}} className="btn btn-default" onClick={this.holdClick}>Change Hold</Button>
        <Button style={{margin:3}} className="btn btn-default" onClick={this.printClick}>Print</Button>
        <Button style={{margin:3}} className="btn btn-danger" onClick={this.props.page.modal.openModal}>Delete</Button>
      </div>
    )
  }
}
