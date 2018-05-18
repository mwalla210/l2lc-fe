import React from 'react'
import { useStrict, extendObservable, action } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import TableActionCell from '../components/tableActionCell'
import ProjectStatusFilter from '../components/projectStatusFilter'
import ProjectStatusCell from '../components/projectStatusCell'
import API from '../api'
useStrict(true)

/**
  * @name CustomerProjectsTableModel
  * @class customerProjectsTableModel
  * @classdesc Project table storage object for a specific customer
  * @description Sets correct onClicks, table columns, filter, and actions
  * @param {Function} infoClickNav Function to navigate on click of info icon
  * @param {Function} editClickNav Function to navigate on click of edit icon
  * @param {Function} deleteClickNav Function to navigate on click of delete icon
  * @param {Function} backClickNav Function to navigate on click of back button
  * @property {Boolean} [filterDD=false] Status filter dropdown state [observable]
  * @property {Object[]} [columns] Sets columns in array for ReactTable
  * @extends TableModel
  * @see {@link Website}
  * @see {@link TableActionCell}
  * @see {@link ProjectStatusFilter}
  * @see {@link ProjectStatusCell}
  * @see {@link API}
 */
export default class CustomerProjectsTableModel extends TableModel{
  constructor(infoClickNav, editClickNav, deleteClickNav, backClickNav) {
    super(
      null,
      () => API.fetchCustomerProjects(Website.currentCustomer.id),
      null,
      {
        title: 'Delete Project?',
        confirmOnClick: deleteClickNav,
        content: 'This action cannot be undone.'
      },
      null,
      backClickNav
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
        Header: 'Job #',
        accessor: 'refNum',
        filterable: true
      },
      {
        Header: 'Created',
        id: 'dateCreated',
        accessor: d => d.dateCreated.toString(),
        filterable: true
      },
      {
        Header: 'Description',
        accessor: 'title',
        filterable: true
      },
      {
        Header: 'Cost Center',
        accessor: 'costCenterProjectType',
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
        Cell: row => <TableActionCell row={row} set={(Website.currentUser.admin) ? 'Full' : 'Restricted'} clickHandler={this.clickHandler} disabledChange={row.original.status == 'Completed'}/>
      }
    ]
  }

  /**
   * @name toggleDropdown
   * @description Project filter status toggle
   * @method toggleDropdown
   * @memberof CustomerProjectsTableModel.prototype
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
   * @memberof CustomerProjectsTableModel.prototype
   * @see {@link Website}
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
