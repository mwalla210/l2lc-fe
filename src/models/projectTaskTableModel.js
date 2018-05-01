import React from 'react'
import { action, useStrict, extendObservable } from 'mobx'
import TableActionCell from '../components/tableActionCell'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import API from '../api'
import Switch from 'react-toggle-switch'
useStrict(true)

//Rename class and model to projectTaskTableModel
//Super call, API stuff, modelizer, use taskModel.js

/**
 * @name ProjectTaskTableModel
 * @class ProjectTaskTableModel
 * @classdesc Draggable row state for draggable tables
 */
export default class ProjectTaskTableModel extends TableModel{
  constructor(buttonClickNav, deleteClickNav){
    super(
      {
        title: 'New Task',
        onClick: buttonClickNav
      },
      () => API.fetchProjectTasks(Website.currentProject.id),
      null,
      {
        title: 'Delete Task?',
        confirmOnClick: deleteClickNav,
        content: 'This action cannot be undone.'
      },
    )
    // let addtlProps = {
    //   data: [
    //     {
    //       required: true,
    //       title: 'Task Index 2',
    //       processArea: '',
    //       status: ''
    //     },
    //     {
    //       required: true,
    //       title: 'Task Index 1',
    //       processArea: '',
    //       status: ''
    //     },
    //     {
    //       required: true,
    //       title: 'Task Index 3',
    //       processArea: '',
    //       status: ''
    //     },
    //   ]
    // }
    extendObservable(this)
    this.deleteClickNav = deleteClickNav
    autoBind(this)
    this.columns = [
      {
        Header: 'Required',
        sortable: false,
        maxWidth: 100,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px',
            }
          }
        },
        Cell: row => <Switch clickHandler={row.original.toggleRequired} on={row.original.required}/>
      },
      {
        Header: 'Task Name',
        accessor: 'taskName',
        filterable: true
      },
      {
        Header: 'Process Area',
        accessor: 'processArea',
        filterable: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterable: true
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
              paddingBottom: '0px',
            }
          }
        },
        Cell: row => <TableActionCell row={row} set="Restricted" clickHandler={this.clickHandler}/>
      }
    ]
  }

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

  // Take item at dragIndex, remove it from list, and insert it at hoverIndex
  @action move(dragIndex, hoverIndex){
    // At dragIndex, remove 1 item
    let row = this.data.splice(dragIndex, 1)
    // If was trying to replace with last item in list, just push
    // hoverIndex will now be greater than data length, can't use splice
    if (hoverIndex > this.data.length)
      this.data.push(row[0])
    else{
      // At hoverIndex, remove 0 items and add row
      this.data.splice(hoverIndex, 0, row[0])
    }
  }
}
