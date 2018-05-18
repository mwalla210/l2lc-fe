import React from 'react'
import { action, useStrict, extendObservable } from 'mobx'
import TableActionCell from '../components/tableActionCell'
import Switch from 'react-toggle-switch'
import 'react-toggle-switch/dist/css/switch.min.css'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import API from '../api'
import Consts from '../consts'
useStrict(true)

/**
 * @name ProjectTaskTableModel
 * @class ProjectTaskTableModel
 * @classdesc Draggable row state for draggable tables
 * @description Sets correct onClicks, table columns, actions, and fetchFn
 * @param {Function} buttonClickNav Function to navigate on click of New Task button
 * @param {Function} deleteClickNav Function to navigate on click of delete icon
 * @param {Function} backClickNav Function to navigate on click of back button
 * @property {Function} deleteClickNav Function to navigate on click of delete icon
 * @property {Function} deleteModal.confirmOnClick Confirm function
 * @property {Boolean} [defaultTaskListModalOpen=false] Task list modal open indicator [observable]
 * @extends TableModel
 * @see {@link TableActionCell}
 * @see {@link Website}
 * @see {@link API}
 * @see {@link Switch}
 */
export default class ProjectTaskTableModel extends TableModel{
  constructor(buttonClickNav, deleteClickNav, backClickNav){
    super(
      {
        title: 'New Task',
        onClick: buttonClickNav
      },
      null,
      null,
      {
        title: 'Delete Task?',
        confirmOnClick: null,
        content: 'This action cannot be undone.'
      },
      null,
      backClickNav
    )
    extendObservable(this, {
      defaultTaskListModalOpen: false,
    })
    this.deleteClickNav = deleteClickNav
    this.deleteModal.confirmOnClick = this.deleteTask
    this.columns = [
      {
        Header: '',
        maxWidth: 80,
        Cell: () =>
          <img
            style={{transform: 'rotate(90deg)', width: '13px'}}
            src={'../../style/open-iconic-master/svg/ellipses.svg'}
          />
      },
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
        Header: 'Station',
        accessor: 'processArea',
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
    this.fetchFn = () => {
      return API.fetchProjectTasks(Website.currentProject.id)
      .then(res => {
        if (
          res.length == 0 &&
          (Website.currentProject.costCenterTitle == 'APC' || Website.currentProject.costCenterTitle == 'Decorative') &&
          ['Piston','Turbo','Rotor','Pump','Avaslick','Decorative','Specialty'].includes(Website.currentProject.jobTypeTitle)
        ){
          this.taskOpenModal()
        }
        return res
      })
    }
    autoBind(this)
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
   * @memberof ProjectTaskTableModel.prototype
   */
  clickHandler(row){
    this.currentTask = row.original
    this.openModal()
  }

  /**
   * @name deleteTask
   * @description Handles delete circle button click
   * @method deleteTask
   * @memberof ProjectTaskTableModel.prototype
   * @see {@link API}
   * @see {@link Website}
   */
  deleteTask(){
    API.dropTask(Website.currentProject.id, JSON.stringify({id: this.currentTask.id}))
    .then(() => {
      this.deleteClickNav()
    })
  }

  /**
   * @name move
   * @description Take item at dragIndex, remove it from list, and insert it at hoverIndex
   * @method move
   * @memberof ProjectTaskTableModel.prototype
   * @param {Number} dragIndex Index dragging from
   * @param {Number} hoverIndex Index dragging to
   * @see {@link API}
   * @see {@link Website}
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

  /**
   * @name taskCloseModal
   * @description Sets defaultTaskListModalOpen prop to false
   * @method taskCloseModal
   * @memberof ProjectTaskTableModel.prototype
   * @mobx action
   */
  @action taskCloseModal(){this.defaultTaskListModalOpen = false}
  /**
   * @name taskOpenModal
   * @description Sets defaultTaskListModalOpen prop to true
   * @method taskOpenModal
   * @memberof ProjectTaskTableModel.prototype
   * @mobx action
   */
  @action taskOpenModal(){this.defaultTaskListModalOpen = true}
  /**
   * @name taskConfirmAndClose
   * @description Closes modal and runs confirm function
   * @method taskConfirmAndClose
   * @memberof ProjectTaskTableModel.prototype
   * @see {@link Website}
   * @see {@link Consts}
   * @see {@link API}
   * @mobx action
   */
  @action taskConfirmAndClose(){
    this.taskCloseModal()
    let tasks = null
    switch(Website.currentProject.jobTypeTitle){
      case 'Piston':
        tasks = Consts.pistonTasks
        break
      case 'Turbo':
        tasks = Consts.turboTasks
        break
      case 'Pump':
        tasks = Consts.pumpTasks
        break
      case 'Rotor':
        tasks = Consts.rotorTasks
        break
      case 'Avaslick':
        tasks = Consts.avaslickTasks
        break
      case 'Decorative':
        tasks = Consts.decorativeTasks
        break
      case 'Specialty':
        tasks = Consts.specialtyTasks
        break
    }
    API.createTaskList(Website.currentProject.id, JSON.stringify(tasks))
    .then(action('fetchSuccess', res => {
      this.data = res
    }))
  }
}
