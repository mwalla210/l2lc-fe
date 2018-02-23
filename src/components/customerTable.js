import React, {Component} from 'react'
import { inject } from 'mobx-react'
import Table from './table'
import TableModel from '../models/tableModel'
import CircleButton from './circleButton'
import API from '../api'

@inject ('page', 'website')
export default class CustomerTable extends Component {
  constructor(props){
    super(props)
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
        Cell: row => (
          <span>
            <span>
              <CircleButton iconName='info' onClick={() => {
                this.props.website.setCustomer(row.original)
                this.props.page.customerSummaryPage()
              }}/>
              <CircleButton styleProps={{marginLeft: '2px'}} iconName='pencil' onClick={() => {
                this.props.website.setCustomer(row.original)
                this.props.page.customerEditPage()
              }}/>
            </span>
          </span>
        )
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

  render() {
    return (
      <Table/>
    )
  }
}
