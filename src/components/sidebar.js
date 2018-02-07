import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('page')@observer
export default class Sidebar extends Component {
  render () {
    return (
      <div className="sidenav">
        <h4>Projects</h4>
        <a onClick ={() => this.props.page.createNewProjMenuItem()}>Create New Project</a>
        <a onClick ={() => this.props.page.projectsMenuItem()}>Projects</a>
        <a onClick ={() => this.props.page.projectTimeEntryMenuItem()}>Project Time Entry</a>
        <a onClick ={() => this.props.page.customerInfoMenuItem()}>Customer Information</a>
        <h4>Analytics</h4>
        <a onClick ={() => this.props.page.emplProductivityMenuItem()}>Employee Productivity</a>
        <a onClick ={() => this.props.page.workstationTrackingMenuItem()}>Workstation Tracking</a>
        <a onClick ={() => this.props.page.jobTypeProductivityMenuItem()}>Job Type Productivity</a>
        <a onClick ={() => this.props.page.costCenterTimeMenuItem()}>Cost Center Time</a>
        <h4>Admin</h4>
        <a onClick ={() => this.props.page.employeeInformationMenuItem()}>Employee Information</a>
        <a onClick ={() => this.props.page.accountManagementMenuItem()}>Account Management</a>
        <h4>Log Out</h4>
      </div>
    )
  }
}
