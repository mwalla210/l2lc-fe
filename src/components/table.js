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
    tableModel: PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.props.tableModel.dataFetch()
  }

  modal(){
    return
  }

  render() {
    /* Page sizing customization
    defaultPageSize={14}
    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
    */

    // If onClick function for rows, redefine onClick for table elements and call function
    // If modal to be opened when row clicked, declare in render and redefine onClick for table elements and call open modal
    let rowSelect = {}
    let rowModal = null
    if (this.props.tableModel.rowSelectFn || this.props.tableModel.rowSelectModal){
      rowSelect = {
        getTdProps: (state, rowInfo) => {
          return {
            onClick: (e, handleOriginal) => {
              if (rowInfo){
                console.log('It was in this row:', rowInfo)
                this.props.tableModel.rowSelectFn && this.props.tableModel.rowSelectFn(rowInfo)
                this.props.tableModel.rowSelectModal && this.props.tableModel.rowSelectModal.openModal(rowInfo)
              }
              if (handleOriginal) {
                handleOriginal()
              }
            }
          }
        },
      }
    }
    let rowStyling = null
    if (this.props.tableModel.styling){
      rowStyling = {
        getTrProps: (state, rowInfo, column) => {
          return this.props.tableModel.styling(state, rowInfo, column)
        }
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
          data={this.props.tableModel.data.slice()}
          columns={this.props.tableModel.columns}
          loading={this.props.tableModel.loading}
          {...rowSelect}
          {...rowStyling}
        />
      </div>
      </div>
    )

  }
}
