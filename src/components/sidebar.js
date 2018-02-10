import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

@inject('page') @observer
export default class Sidebar extends Component {
  static propTypes = {
    highlight: PropTypes.string
  }

  menuItems = [
    {
      title: true,
      header: 'Projects'
    },
    {
      title: false,
      header: 'Create New Project',
      onClick: () => this.props.page.createNewProjMenuItem()
    },
    {
      title: false,
      header: 'Projects',
      onClick: () => this.props.page.projectsMenuItem()
    },
    {
      title: false,
      header: 'Time Entry',
      onClick: () => this.props.page.projectTimeEntryMenuItem()
    },
    {
      title: false,
      header: 'Customer Information',
      onClick: () => this.props.page.customerInfoMenuItem()
    },
    {
      title: true,
      header: 'Analytics'
    },
    {
      title: false,
      header: 'Employee Productivity',
      onClick: () => this.props.page.emplProductivityMenuItem()
    },
    {
      title: false,
      header: 'Workstation Tracking',
      onClick: () => this.props.page.workstationTrackingMenuItem()
    },
    {
      title: false,
      header: 'Job Type Productivity',
      onClick: () => this.props.page.jobTypeProductivityMenuItem()
    },
    {
      title: false,
      header: 'Cost Center Time',
      onClick: () => this.props.page.costCenterTimeMenuItem()
    },
    {
      title: true,
      header: 'Admin'
    },
    {
      title: false,
      header: 'Employee Information',
      onClick: () => this.props.page.employeeInformationMenuItem()
    },
    {
      title: false,
      header: 'Account Information',
      onClick: () => this.props.page.accountManagementMenuItem()
    },
  ]

  renderTitle(obj, index){
    return (
      <h4 key={index}>{obj.header}</h4>
    )
  }

  renderClickable(obj, index, highlight=false){
    let addtl = {}
    if (highlight) addtl = {
      style: {
        background: '#f1f1f1',
        color: '#316ea2'
      }
    }
    return (
      <a onClick={obj.onClick} key={index} {...addtl}>{obj.header}</a>
    )
  }

  render () {
    return (
      <div className="sidenav">
        {this.menuItems.map((item, index) => {
          if (item.title) return this.renderTitle(item, index)
          else
            return this.renderClickable(item, index, (item.header == this.props.highlight))
        })}
        <h4>Log Out</h4>
      </div>
    )
  }
}
