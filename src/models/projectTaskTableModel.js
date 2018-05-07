import React from 'react'
import { action, useStrict } from 'mobx'
import TableActionCell from '../components/tableActionCell'
import Switch from 'react-toggle-switch'
import 'react-toggle-switch/dist/css/switch.min.css'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import API from '../api'
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
        confirmOnClick: () => {
          API.dropTask(Website.currentProject.id, JSON.stringify({taskId: this.id}))
          .then(() => {
            deleteClickNav()
          })
        },
        content: 'This action cannot be undone.'
      },
    )
    this.deleteClickNav = deleteClickNav
    autoBind(this)
    this.columns = [
      {
        Header: 'Required',
        sortable: false,
        maxWidth: 80,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px',
            }
          }
        },
        Cell: row => {
          let click = () => {
            row.original.toggleRequired()
            this.requiredClickHandler()
          }
          return (
            <div style={{paddingTop: '7px'}}><Switch onClick={click} on={row.original.required}/></div>
          )
        }
      },
      {
        Header: 'Task Name',
        accessor: 'title',
        sortable: false,
      },
      {
        Header: 'Process Area',
        accessor: 'processArea',
        sortable: false,
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortable: false,
      },
      {
        Header: 'Actions',
        sortable: false,
        maxWidth: 80,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px',
            }
          }
        },
        Cell: row => <TableActionCell row={row} set="Delete" clickHandler={this.clickHandler}/>
      }
    ]
  }

  /**
   * @name requiredClickHandler
   * @description Resets data list so table updates visually
   * @method requiredClickHandler
   * @memberof ProjectTaskTableModel.prototype
   * @mobx action
   */
  @action requiredClickHandler(){
    let newList = []
    this.data.forEach(item => newList.push(item))
    this.data = newList
  }

  /**
   * @name clickHandler
   * @description Handles delete circle button click
   * @method clickHandler
   * @param  {Object}     row  Related row object
   * @param  {String}     type Circle button type
   * @memberof ProjectTaskTableModel.prototype
   */
  clickHandler(row, type){
    if (type == 'delete'){
      this.openModal()
    }
  }

  /**
   * @name move
   * @description Take item at dragIndex, remove it from list, and insert it at hoverIndex
   * @method move
   * @memberof ProjectTaskTableModel.prototype
   * @param {Number} dragIndex Index dragging from
   * @param {Number} hoverIndex Index dragging to
   * @mobx action
   */
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
    let jsonList = []
    this.data.forEach((model, index) => {
      jsonList.push({
        id: model.id,
        placement: index+1
      })
    })
    API.updateTaskList(Website.currentProject.id, JSON.stringify(jsonList))
  }
}
