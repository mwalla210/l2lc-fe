import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import { SplitButton } from 'react-bootstrap'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'
import Table from './table'
import TableModel from '../models/tableModel'
import API from '../api'

const highPriority = '#f4ba61'
const medPriority = '#f4e261'
const doneColor = '#49a4ff'
const helpColor = '#ffbf00'
const openColor = '#57d500'

@inject ('page', 'website') @observer
export default class ProjectTable extends Component {
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
        Cell: row => (
          <span>
            {/* TODO: adjust this to be accurate for values of fn*/}
            <span style={{
              color: row.value === 'Completed' ? doneColor
                : row.value === 'On Hold' ? helpColor
                // Received, In Progress
                : openColor,
              transition: 'all .3s ease'}}>
                &#x25cf;
            </span>
            {` ${row.value}`}
          </span>
        ),
        filterMethod: (filter, row) => {
          // filter.value.length==0: no filters selected
          return filter.value.length == 0 || filter.value.includes(row[filter.id])
        },
        Filter: ({filter, onChange}) =>
          <SplitButton
            bsSize="small"
            title='Filter'
            id='split-button-small'
          >
            <CheckboxGroup
              name="Filters"
              value={filter ? filter.value : []}
              onChange={val => onChange(val)}
            >
              <label style={{marginLeft: '8px'}}><Checkbox value="Received"/> Received</label>
              <br/>
              <label style={{marginLeft: '8px'}}><Checkbox value="In Progress"/> In Progress</label>
              <br/>
              <label style={{marginLeft: '8px'}}><Checkbox value="On Hold"/> On Hold</label>
              <br/>
              <label style={{marginLeft: '8px'}}><Checkbox value="Completed"/> Completed</label>
              <br/>
              <label style={{marginLeft: '8px'}}><Checkbox value="Dropped"/> Dropped</label>
              <br/>
            </CheckboxGroup>
          </SplitButton>
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

  render() {
    return (
      <Table/>
    )
  }
}
