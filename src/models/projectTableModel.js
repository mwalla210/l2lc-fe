import React from 'react'
import { useStrict, extendObservable, action } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import TableActionCell from '../components/tableActionCell'
import ProjectStatusFilter from '../components/projectStatusFilter'
import ProjectStatusCell from '../components/projectStatusCell'
import API from '../api'
import Consts from '../consts'
useStrict(true)

/**
  * @name ProjectTableModel
  * @class ProjectTableModel
  * @classdesc Project initializer for table storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} infoClickNav Function to navigate on click of info icon
  * @property {Function} editClickNav Function to navigate on click of edit icon
  * @property {Function} deleteClickNav Function to navigate on click of delete icon
  * @property {Boolean} [filterDD=false] Status filter dropdown state
  * @extends TableModel
 */
export default class ProjectTableModel extends TableModel{
  constructor(infoClickNav, editClickNav, deleteClickNav) {
    super(
      null,
      API.fetchProjects,
      null,
      {
        title: 'Delete Project?',
        confirmOnClick: deleteClickNav,
        content: 'This action cannot be undone.'
      }
    )
    let addtlProps = {
      filterDD: false
    }
    extendObservable(this,addtlProps)
    this.infoClickNav = infoClickNav
    this.editClickNav = editClickNav
    autoBind(this)
    this.columns = [
      {
        Header: 'ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'Created',
        id: 'dateCreated',
        accessor: d => d.dateCreated.toString(),
        filterable: true
      },
      {
        Header: 'Title',
        accessor: 'title',
        filterable: true
      },
      {
        id: 'customerName', // Required because our accessor is not a string
        Header: 'Customer Name',
        accessor: d => d.customer.companyName,
        filterable: true
      },
      {
        Header: 'Cost Center',
        accessor: 'costCenterTitle',
        filterable: true
      },
      {
        Header: 'Time Spent',
        accessor: 'timeSpent',
        filterable: true
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        filterable: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterable: true,
        headerStyle:  {
          overflow: 'visible',
        },
        Cell: row => <ProjectStatusCell row={row}/>,
        filterMethod: (filter, row) => {
          // filter.value.length==0: no filters selected
          return filter.value.length == 0 || filter.value.includes(row[filter.id])
        },
        Filter: ({filter, onChange}) => <ProjectStatusFilter filter={filter} onChange={onChange} dropdownOpen={this.filterDD} dropdownToggle={this.toggleDropdown}/>,
      },
      {
        Header: 'Actions',
        sortable: false,
        maxWidth: 100,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px'
            }
          }
        },
        Cell: row => <TableActionCell row={row} set="Full" clickHandler={this.clickHandler} disabledChange={row.original.status == 'Completed'}/>
      }
    ]
  }

  /**
   * @name toggleDropdown
   * @description Project filter status toggle
   * @method toggleDropdown
   * @memberof ProjectTableModel.prototype
   * @mobx action
   */
  @action toggleDropdown(){
    this.filterDD = !this.filterDD
  }

  /**
   * @name clickHandler
   * @description Handles action icon clicks
   * @method clickHandler
   * @param  {Object}     row   Row of click
   * @param  {String}     type  Icon click type
   * @memberof ProjectTableModel.prototype
   */
  clickHandler(row, type){
    if (type == 'info' || type == 'edit' || type == 'delete'){
      Website.setProject(row.original)
      if (type == 'info'){
        this.infoClickNav()
      }
      else if (type == 'edit'){
        this.editClickNav()
      }
      else {
        this.openModal()
      }
    }
  }
}
