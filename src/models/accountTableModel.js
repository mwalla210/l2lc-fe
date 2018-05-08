import React from 'react'
import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import API from '../api'
import Switch from 'react-toggle-switch'
import 'react-toggle-switch/dist/css/switch.min.css'
useStrict(true)

/**
  * @name AccountTableModel
  * @class AccountTableModel
  * @classdesc Customer initializer for table storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} buttonClickNav Function to navigate on click of table button
  * @property {Function} infoClickNav Function to navigate on click of info icon
  * @property {Function} editClickNav Function to navigate on click of edit icon
  * @property {Function} selectNav Function to navigate on select of row (when adding customer to project)
  * @extends TableModel
 */
export default class AccountTableModel extends TableModel{
  constructor(buttonClickNav, editClickNav) {
    super(
      {
        title: 'New Account',
        onClick: buttonClickNav
      },
      API.fetchAccounts,
    )
    this.editClickNav = editClickNav
    autoBind(this)
    this.columns = [
      {
        Header: 'ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'Username',
        accessor: 'username',
        filterable: true
      },
      {
        Header: 'Admin',
        //accessor: 'admin',
        sortable: false,
        maxWidth: 80,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px'
            }
          }
        },
        id: 'admin',
        Cell: row => {
          let click = () => {
            row.original.toggleAdmin()
            this.requiredClickHandler()
          }
          return (
            <div style={{paddingTop: '7px'}}><Switch onClick={click} on={row.original.admin}/></div>
          )
        }
      },
    ]
  }

  /**
   * @name requiredClickHandler
   * @description Resets data list so table updates visually
   * @method requiredClickHandler
   * @memberof AccountTableModel.prototype
   * @mobx action
   */
  @action requiredClickHandler(){
    let newList = []
    this.data.forEach(item => newList.push(item))
    this.data = newList
  }

  /**
   * @name clickHandler
   * @description Handles action icon clicks
   * @method clickHandler
   * @param  {Object}     row   Row of click
   * @param  {String}     type  Icon click type
   * @memberof AccountTableModel.prototype
   */
  clickHandler(row, type){
    if (type == 'edit'){
      this.editClickNav()
    }
  }
}