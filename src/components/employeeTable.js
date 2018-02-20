import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import Table from './table'
import TableModel from '../models/tableModel'
import API from '../api'
import JsBarcode from 'jsbarcode'

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
              <img
                onLoad={() => JsBarcode(`#${row.original.firstName}${row.original.id}`, `${row.original.id}`)}
                id={`${row.original.firstName}${row.original.id}`}
                src="../../style/open-iconic-master/svg/image.svg"
                alt="image"
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
        Cell: row => (
          <span>
            <span>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                this.props.website.setEmployee(row.original)
                this.props.page.employeeSummaryPage()
              }}>
                <img src="../../style/open-iconic-master/svg/info.svg" alt="info"/>
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                this.props.website.setEmployee(row.original)
                this.props.page.employeeEditPage()
              }}>
                <img src="../../style/open-iconic-master/svg/pencil.svg" alt="pencil" />
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                this.props.website.setEmployee(row.original)
                this.props.page.tableModel.openModal()
              }}>
                <img src="../../style/open-iconic-master/svg/trash.svg" alt="trash" style={{marginLeft: '2px'}}/>
              </button>
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
