import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import TableButton from './tableButton'

@inject ('page') @observer
export default class Table extends Component {
  static propTypes = {
    tableModel: PropTypes.object.isRequired,
  }

  constructor(props){
    super(props)
    this.props.tableModel.dataFetch()
  }

  modal(){
    return
  }

  render() {
    // const data = [
    //   {
    //     name: 'Tanner Linsley',
    //     age: 26,
    //     friend: {
    //       name: 'Jason Maurer',
    //       age: 23,
    //     }
    //   }
    // ]
    // const columns = [
    //   {
    //     Header: 'Name',
    //     accessor: 'name' // String-based value accessors!
    //   },
    //   {
    //     Header: 'Age',
    //     accessor: 'age',
    //     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    //   },
    //   {
    //     id: 'friendName', // Required because our accessor is not a string
    //     Header: 'Friend Name',
    //     accessor: d => d.friend.name // Custom value accessors!
    //   },
    //   {
    //     Header: props => <span>Friend Age</span>, // Custom header components!
    //     accessor: 'friend.age'
    //   }
    // ]

    /* Page sizing customization
    defaultPageSize={14}
    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
    */

    // If onClick function for rows, redefine onClick for table elements and call function
    // If modal to be spawned when row clicked, declare in render and redefine onClick for table elements and call open modal

    let rowSelect = {}
    let rowModal = null
    if (this.props.tableModel.rowSelectFn || this.props.tableModel.rowSelectModal){
      rowSelect = {
        getTdProps: (state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              if (rowInfo){
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)
                this.props.tableModel.rowSelectFn && this.props.tableModel.rowSelectFn()
              }
              // IMPORTANT! React-Table uses onClick internally to trigger
              // events like expanding SubComponents and pivots.
              // By default a custom 'onClick' handler will override this functionality.
              // If you want to fire the original onClick handler, call the
              // 'handleOriginal' function.
              if (handleOriginal) {
                handleOriginal()
              }
            }
          }
        },

      }

    }
    let buttonContent = null
    if (this.props.tableModel.tableButton){
      buttonContent =
        <div className='row'>
          <TableButton
            title={this.props.tableModel.tableButton.title}
            onClick={this.props.tableModel.tableButton.onClick}/>
        </div>
    }
    return (
      <div>
      {buttonContent}
      <div className='row'>
        <ReactTable
          data={toJS(this.props.tableModel.data)}
          columns={this.props.tableModel.columns}
          loading={this.props.tableModel.loading}
          {...rowSelect}
        />
      </div>
      </div>
    )

  }
}
