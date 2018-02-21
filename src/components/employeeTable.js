import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import Table from './table'
import TableModel from '../models/tableModel'
import CircleButton from './circleButton'
import API from '../api'
import Barcode from './barcode'

@inject ('page', 'website') @observer
export default class EmployeeTable extends Component {
  constructor(props){
    super(props)
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
                barcodeID={row.original.id.toString()}/>
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
        Cell: row => (
          <span>
            <span>
              <CircleButton iconName='info' onClick={() => {
                this.props.website.setEmployee(row.original)
                this.props.page.employeeSummaryPage()
              }}/>
              <CircleButton iconName='pencil' onClick={() => {
                this.props.website.setEmployee(row.original)
                this.props.page.employeeEditPage()
              }}/>
              <CircleButton styleProps={{marginLeft: '2px'}} iconName='trash' onClick={() => {
                this.props.website.setEmployee(row.original)
                this.props.page.tableModel.openModal()
              }}/>
            </span>
          </span>
        )
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

  render() {
    return (
      <Table/>
    )
  }
}
