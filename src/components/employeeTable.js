import React, {Component} from 'react'
import { inject } from 'mobx-react'
import Table from './table'
import TableActionCell from './tableActionCell'
import TableModel from '../models/tableModel'
import API from '../api'
import Barcode from './barcode'

@inject ('page', 'website')
export default class EmployeeTable extends Component {
  constructor(props){
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
    let columns = [
      {
        Header: 'ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        filterable: true
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        filterable: true
      },
      {
        Header: 'Barcode',
        accessor: 'barcode',
        Cell: row => (
          <span>
            <span>
              <Barcode
                imageDomID={`${row.original.firstName}${row.original.id}`}
                barcodeID={row.original.id.toString()}
              />
            </span>
          </span>
        )
      },
      {
        Header: 'Actions',
        sortable: false,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px',
            }
          }
        },
        Cell: row => <TableActionCell row={row} set="Full" clickHandler={this.clickHandler}/>
      }
    ]
    // tableButton, fetchFn, rowSelectFn, columns, deleteModal, styling
    this.props.page.setTableModel(new TableModel(
      {
        title: 'New Employee',
        onClick: () => this.props.page.newEmployeePage()
      },
      API.fetchEmployees,
      () => console.log('rowSelectFn'),
      columns,
      {
        title: 'Delete Employee?',
        confirmOnClick: () => console.log('confirm'),
        content: 'This action cannot be undone.'
      },
    ))
    this.props.page.tableModel.dataFetch()
  }

  clickHandler(row, type){
    if (type == 'info' || type == 'edit' || type == 'delete'){
      this.props.website.setEmployee(row.original)
      if (type == 'info'){
        this.props.page.employeeSummaryPage()
      }
      else if (type == 'edit'){
        this.props.page.employeeEditPage()
      }
      else {
        this.props.page.tableModel.openModal()
      }
    }
  }

  render() {
    return (
      <Table/>
    )
  }
}
