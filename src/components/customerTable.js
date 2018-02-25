import React, {Component} from 'react'
import { inject } from 'mobx-react'
import Table from './table'
import TableActionCell from './tableActionCell'
import TableModel from '../models/tableModel'
import API from '../api'

@inject ('page', 'website')
export default class CustomerTable extends Component {
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
        Cell: row => <TableActionCell row={row} set="Restricted" clickHandler={this.clickHandler}/>
      }
    ]
    // tableButton, fetchFn, rowSelectFn, columns, deleteModal, styling
    this.props.page.setTableModel(new TableModel(
      {
        title: 'New Customer',
        onClick: () => this.props.page.newCustomerPage()
      },
      API.fetchCustomers,
      null,
      columns,
    ))
    this.props.page.tableModel.dataFetch()
  }

  clickHandler(row, type){
    if (type == 'info' || type == 'edit'){
      this.props.website.setCustomer(row.original)
      if (type == 'info'){
        this.props.page.customerSummaryPage()
      }
      else{
        this.props.page.customerEditPage()
      }
    }
  }

  render() {
    return (
      <Table/>
    )
  }
}
