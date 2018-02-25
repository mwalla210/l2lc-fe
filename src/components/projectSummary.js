import React, {Component} from 'react'
import { inject } from 'mobx-react'

@inject ('website')
export default class ProjectSummary extends Component {
  render() {
    return (
      <div>
        <p>{`ID: ${this.props.website.currentProject.id}`}</p>
        <p>{`Cost Center: ${this.props.website.currentProject.costCenter}`}</p>
        <p>{`Project Type: ${this.props.website.currentProject.projectType}`}</p>
        <p>{`Project Title: ${this.props.website.currentProject.projectTitle}`}</p>
        <p>{'Customer information should go here somewhere:'}</p>
        <p>{`Priority: ${this.props.website.currentProject.priority}`}</p>
        <p>{`Description: ${this.props.website.currentProject.description}`}</p>
        <p>{`Part Count: ${this.props.website.currentProject.partCount}`}</p>
        <p>{`Reference Number: ${this.props.website.currentProject.referenceNumber}`}</p>
      </div>
    )
  }
}
