import React, {Component} from 'react'
import { inject } from 'mobx-react'
import Table from './table'
import TableModel from '../models/tableModel'
import ProjectStatusCell from './projectStatusCell'
import TableActionCell from './tableActionCell'
import ProjectStatusFilter from './projectStatusFilter'
import API from '../api'

const highPriority = '#f4ba61'
const medPriority = '#f4e261'

@inject ('page', 'website')
export default class ProjectTable extends Component {
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
        Header: 'Created',
        id: 'dateCreated',
        accessor: d => d.dateCreated.toString(),
        filterable: true
      },
      {
        Header: 'Title',
        accessor: 'title',
        filterable: true
      },
      {
        id: 'customerName', // Required because our accessor is not a string
        Header: 'Customer Name',
        accessor: d => d.customer.companyName,
        filterable: true
      },
      {
        Header: 'Cost Center',
        accessor: 'costCenterTitle',
        filterable: true
      },
      {
        Header: 'Time Spent',
        accessor: 'timeSpent',
        filterable: true
      },
      {
        Header: 'Finished',
        accessor: 'dateFinished',
        filterable: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterable: true,
        headerStyle:  {
          overflow: 'visible',
        },
        Cell: row => <ProjectStatusCell row={row}/>,
        filterMethod: (filter, row) => {
          // filter.value.length==0: no filters selected
          return filter.value.length == 0 || filter.value.includes(row[filter.id])
        },
        Filter: ({filter, onChange}) => <ProjectStatusFilter filter={filter} onChange={onChange}/>,
      },
      {
        Header: 'Actions',
        sortable: false,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px'
            }
          }
        },
        Cell: row => <TableActionCell row={row} set="Full" clickHandler={this.clickHandler}/>
      }
    ]
    // tableButton, fetchFn, rowSelectFn, columns, deleteModal, styling
    this.props.page.setTableModel(new TableModel(
      null,
      API.fetchProjects,
      null,
      columns,
      {
        title: 'Delete Project?',
        confirmOnClick: () => console.log('confirm'),
        content: 'This action cannot be undone.'
      },
      (state, rowInfo) => {
        if (rowInfo && rowInfo.row._original.priority != 'Low'){
          return {
            style: {
              background: rowInfo.row._original.priority == 'High' ? highPriority : medPriority
            }
          }
        }
        return {}
      }
    ))
    this.props.page.tableModel.dataFetch()
  }

  clickHandler(row, type){
    if (type == 'info' || type == 'edit' || type == 'delete'){
      this.props.website.setProject(row.original)
      if (type == 'info'){
        this.props.page.projectSummaryPage()
      }
      else if (type == 'edit'){
        this.props.page.projectEditPage()
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
