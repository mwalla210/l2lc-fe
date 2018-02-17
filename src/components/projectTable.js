import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import Table from './table'
import TableModel from '../models/tableModel'
import API from '../api'

const highPriority = '#f4ba61'
const medPriority = '#f4e261'
const doneColor = '#ff2e00'
const helpColor = '#ffbf00'
const openColor = '#57d500'

@inject ('page', 'website') @observer
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
        Header: 'Created',
        accessor: 'dateCreated',
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
        accessor: d => d.customer.name,
        filterable: true
      },
      {
        id: 'costCenter', // Required because our accessor is not a string
        Header: 'Cost Center',
        accessor: d => d.costCenter.title,
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
        Cell: row => (
          <span>
            {/* TODO: adjust this to be accurate for values of fn*/}
            <span style={{
              color: row.value === 'Closed' ? doneColor
                : row.value === '?' ? helpColor
                : openColor,
              transition: 'all .3s ease'}}>
                &#x25cf;
            </span>
            {row.value}
          </span>
        ),
        filterMethod: (filter, row) => {
          if (filter.value === 'all') {
            return true
          }
          if (filter.value === 'true') {
            {/* TODO: adjust this to be accurate for values of fn*/}
            return row[filter.id] == 'Open'
          }
          {/* TODO: adjust this to be accurate for values of fn*/}
          return row[filter.id] != 'Open'
        },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}
          >
            <option value="all">Show All</option>
            <option value="true">Open</option>
            <option value="false">Closed</option>
          </select>
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
        Cell: row => (
          <span>
            <span>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                this.props.website.setProject(row.original)
                this.props.page.projectSummaryPage()
              }}>
                <img src="../../style/open-iconic-master/svg/info.svg" alt="info"/>
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                this.props.website.setProject(row.original)
                this.props.page.projectEditPage()
              }}>
                <img src="../../style/open-iconic-master/svg/pencil.svg" alt="pencil" style={{marginLeft: '2px'}}/>
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                this.props.website.setProject(row.original)
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
        if (rowInfo && rowInfo.row._original.priority != 'low'){
          return {
            style: {
              background: rowInfo.row._original.priority == 'high' ? highPriority : medPriority
            }
          }
        }
        return {}
      }
    ))
    this.props.page.tableModel.dataFetch()
  }

  render() {
    return (
      <Table/>
    )
  }
}
