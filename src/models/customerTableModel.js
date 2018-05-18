import React from 'react'
import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import TableActionCell from '../components/tableActionCell'
import ButtonDefault from '../components/buttonDefault'
import API from '../api'
useStrict(true)

/**
  * @name CustomerTableModel
  * @class CustomerTableModel
  * @classdesc Customer initializer for table storage object
  * @description Sets correct onClicks, table columns, and actions
  * @param {Function} buttonClickNav Function to navigate on click of table button
  * @param {Function} infoClickNav Function to navigate on click of info icon
  * @param {Function} editClickNav Function to navigate on click of edit icon
  * @param {Function} selectNav Function to navigate on select of row (when adding customer to project)
  * @extends TableModel
  * @see {@link API}
 */
export default class CustomerTableModel extends TableModel{
  constructor(buttonClickNav, infoClickNav, editClickNav, selectNav) {
    super(
      {
        title: 'New Customer',
        onClick: buttonClickNav
      },
      API.fetchCustomers,
    )
    this.infoClickNav = infoClickNav
    this.editClickNav = editClickNav
    this.selectNav = selectNav
    autoBind(this)
    this.columns = this.actionColumns()
  }
  /**
   * @name mainColumns
   * @description Sets columns to have action icons instead of select button
   * @method mainColumns
   * @memberof CustomerTableModel.prototype
   * @return {Array}
   */
  mainColumns(){
    return [
      {
        Header: 'ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'Name',
        accessor: 'companyName',
        filterable: true
      },
      {
        Header: 'Shipping Address',
        accessor: 'formattedShipAddress',
        filterable: true
      },
      {
        Header: 'Billing Address',
        accessor: 'formattedBillAddress',
        filterable: true
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        filterable: true
      },
    ]
  }
  /**
   * @name actionColumns
   * @description Sets columns to have action icons instead of select button
   * @method actionColumns
   * @memberof CustomerTableModel.prototype
   * @return {Array}
   * @see {@link TableActionCell}
   * @see {@link Website}
   */
  actionColumns(){
    let cols = this.mainColumns()
    cols.push(
      {
        Header: 'Actions',
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
        Cell: row => <TableActionCell row={row} set={Website.currentUser.admin ? 'Restricted' : 'View'} clickHandler={this.clickHandler}/>
      }
    )
    return cols
  }
  /**
   * @name noActionColumns
   * @description Sets columns to have select button instead of action icons
   * @method noActionColumns
   * @memberof CustomerTableModel.prototype
   * @return {Array}
   * @see {@link ButtonDefault}
   */
  noActionColumns(){
    let cols = this.mainColumns()
    cols.push(
      {
        Header: 'Actions',
        sortable: false,
        maxWidth: 80,
        Cell: row => {
          let click = () => {
            this.selectClick(row)
          }
          return (
            <span>
              <span>
                <ButtonDefault className="btn-info" onClick={click} text="Select"/>
              </span>
            </span>
          )
        }
      }
    )
    return cols
  }
  /**
   * @name selectCreateClick
   * @description Handles row click when table in select mode for NEW project
   * @method selectCreateClick
   * @param  {Object}     row   Row of click
   * @memberof CustomerTableModel.prototype
   * @see {@link Website}
   */
  selectCreateClick(row){
    Website.currentProject.changeCustomer(row.original)
    Website.setCustomer(row.original)
    let body = {
      jobType: Website.currentProject.jobTypeTitle,
      costCenter: Website.currentProject.costCenterTitle,
      title: Website.currentProject.title,
      description: Website.currentProject.descr,
      priority: Website.currentProject.priority,
      partCount: Website.currentProject.partCount,
      refNumber: Website.currentProject.refNum,
      customer: {id: Website.currentProject.customerID}
    }
    Website.createProject(body)
    .then(() => this.selectNav())
  }
  /**
   * @name selectUpdateClick
   * @description Handles row click when table in select mode for EXISTING project
   * @method selectUpdateClick
   * @param  {Object}     row   Row of click
   * @memberof CustomerTableModel.prototype
   * @see {@link Website}
   */
  selectUpdateClick(row){
    Website.currentProject.changeCustomer(row.original)
    let body = {
      customer: {id: Website.currentProject.customerID}
    }
    Website.updateProject(Website.currentProject.id, body)
    .then(() => this.selectNav())
  }
  /**
   * @name clickHandler
   * @description Handles action icon clicks
   * @method clickHandler
   * @param  {Object}     row   Row of click
   * @param  {String}     type  Icon click type
   * @memberof CustomerTableModel.prototype
   * @see {@link Website}
   */
  clickHandler(row, type){
    if (type == 'info' || type == 'edit'){
      Website.setCustomer(row.original)
      if (type == 'info'){
        this.infoClickNav()
      }
      else{
        this.editClickNav()
      }
    }
  }
  /**
   * @name selectTable
   * @description Sets table up as selectable for NEW project
   * @method selectTable
   * @memberof CustomerTableModel.prototype
   * @mobx action
   */
  @action selectCreateTable(){
    this.columns = this.noActionColumns()
    this.selectClick = this.selectCreateClick
  }
  /**
   * @name selectTable
   * @description Sets table up as selectable for EXISTING
   * @method selectTable
   * @memberof CustomerTableModel.prototype
   * @mobx action
   */
  @action selectUpdateTable(){
    this.columns = this.noActionColumns()
    this.selectClick = this.selectUpdateClick
  }
  /**
   * @method nonSelectTable
   * @description Sets table up as non selectable (No on-click function for rows, action columns)
   * @method nonSelectTable
   * @memberof CustomerTableModel.prototype
   * @mobx action
   */
  @action nonSelectTable(){
    this.columns = this.actionColumns()
  }
}
