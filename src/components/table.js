import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import TableButton from './tableButton'
import DeleteModal from './deleteModal'

@inject ('page') @observer
export default class Table extends Component {
  static propTypes = {
    tableModel: PropTypes.object.isRequired
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
    let rowSelect = {}
    if (this.props.tableModel.rowSelectFn){
      rowSelect = {
        getTdProps: (state, rowInfo) => {
          return {
            onClick: (e, handleOriginal) => {
              if (rowInfo){
                console.log('It was in this row:', rowInfo)
                this.props.tableModel.rowSelectFn(rowInfo)
              }
              if (handleOriginal) {
                handleOriginal()
              }
            }
          }
        },
      }
    }
    let rowModal = null
    // If modal to be opened when row clicked, declare in render and redefine onClick for table elements and call open modal
    if (this.props.tableModel.deleteModal){
      rowModal = <DeleteModal
        title={this.props.tableModel.deleteModal.title}
        confirmOnClick={() => this.props.tableModel.confirmAndClose()}
        denyOnClick={() => this.props.tableModel.closeModal()}
        open={this.props.tableModel.modalOpen}
        closeFn={() => this.props.tableModel.closeModal()}
        content={this.props.tableModel.deleteModal.content}
      />
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
        <div>
          <TableButton
            title={this.props.tableModel.tableButton.title}
            onClick={this.props.tableModel.tableButton.onClick}/>
        </div>
    }
    return (
      <div>
      {buttonContent}
      {rowModal}
      <div style={{clear: 'both'}}>
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
