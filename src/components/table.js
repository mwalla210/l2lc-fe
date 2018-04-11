import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import TableButton from './tableButton'
import DeleteModal from './deleteModal'

/**
 * Table component; constructor binds functions
 * @namespace Table
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 */
@inject ('page') @observer
export default class Table extends Component {
  constructor(props){
    super(props)
    this.filter = this.filter.bind(this)
    this.props.page.tableModel.confirmAndClose = this.props.page.tableModel.confirmAndClose.bind(this.props.page.tableModel)
    this.props.page.tableModel.closeModal = this.props.page.tableModel.closeModal.bind(this.props.page.tableModel)
  }

  /**
   * Filters a row in table
   * @method filter
   * @memberof Table.prototype
   * @param {Object} filter Row filter content
   * @param {Object} row Row content
   */
  filter(filter, row){
    const id = filter.pivotId || filter.id
    return (row[id] !== undefined) ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : false
  }

  /**
   * Renders HTML div component, containing TableButton, DeleteModal, and ReactTable
   * @method render
   * @memberof Table.prototype
   * @return {Component}
   * @see {@link https://react-table.js.org/#/story/readme ReactTable}
   * @see {@link DeleteModal}
   * @see {@link TableButton}
   */
  render() {
    /* Page sizing customization
    defaultPageSize={14}
    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
    */

    let rowModal = null
    // If modal to be opened when row clicked, declare in render and redefine onClick for table elements and call open modal
    if (this.props.page.tableModel.deleteModal){
      rowModal = (
        <DeleteModal
          title={this.props.page.tableModel.deleteModal.title}
          confirmOnClick={this.props.page.tableModel.confirmAndClose}
          denyOnClick={this.props.page.tableModel.closeModal}
          open={this.props.page.tableModel.modalOpen}
          closeFn={this.props.page.tableModel.closeModal}
          content={this.props.page.tableModel.deleteModal.content}
        />
      )
    }
    let rowStyling = null
    if (this.props.page.tableModel.styling){
      rowStyling = {
        getTrProps: (state, rowInfo, column) => {
          return this.props.page.tableModel.styling(state, rowInfo, column)
        }
      }
    }
    let buttonContent = null
    if (this.props.page.tableModel.tableButton){
      buttonContent =
        (<div>
          <TableButton
            title={this.props.page.tableModel.tableButton.title}
            onClick={this.props.page.tableModel.tableButton.onClick}
          />
        </div>)
    }
    return (
      <div>
      {buttonContent}
      {rowModal}
      <div style={{clear: 'both'}}>
        <ReactTable
          data={this.props.page.tableModel.data.slice()}
          columns={this.props.page.tableModel.columns.slice()}
          loading={this.props.page.tableModel.loading}
          defaultFilterMethod={this.filter}
          {...rowStyling}
        />
      </div>
      </div>
    )

  }
}
