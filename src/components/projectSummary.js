import React, {Component} from 'react'
import { inject } from 'mobx-react'

@inject ('website')
export default class ProjectSummary extends Component {
  render() {
    return (
      <div>
        <p>{`ID: ${this.props.website.currentProject.id}`}</p>
        <p>{`Cost Center: ${this.props.website.currentProject.costCenterTitle}`}</p>
        <p>{`Project Type: ${this.props.website.currentProject.jobTypeTitle}`}</p>
        <p>{`Project Title: ${this.props.website.currentProject.title}`}</p>
        <p>{`Customer (TODO in model): ${this.props.website.currentProject.customer}`}</p>
        <p>{`Priority: ${this.props.website.currentProject.priority}`}</p>
        <p>{`Status: ${this.props.website.currentProject.status}`}</p>
        <p>{`Total time spent (TODO):`}</p>
        <p>{`Part Count: ${this.props.website.currentProject.partCount}`}</p>
        <p>{`Description: ${this.props.website.currentProject.descr}`}</p>
        <p>{`Reference Number: ${this.props.website.currentProject.refNum}`}</p>
      </div>
    )
  }
}
