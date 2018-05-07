import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DraggableRow from './draggableRow'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import TableButton from './tableButton'
import DeleteModal from './deleteModal'
import ButtonDefault from './buttonDefault'
import {ButtonGroup} from 'reactstrap'

//Go into table component and copy from the render function the section for button content starting with let button = null
//Replace the top div stuff between table.js and here

@DragDropContext(HTML5Backend) @inject('page') @observer
export default class DraggableTable extends Component {
  constructor(props){
    super(props)
    this.rowProps = this.rowProps.bind(this)
    this.printClick = this.printClick.bind(this)
    this.props.page.tableModel.confirmAndClose = this.props.page.tableModel.confirmAndClose.bind(this.props.page.tableModel)
    this.props.page.tableModel.closeModal = this.props.page.tableModel.closeModal.bind(this.props.page.tableModel)
  }

  /**
   * On click handler for print button
   * @method printClick
   * @memberof DraggableTable.prototype
   */
  printClick(){
    // eslint-disable-next-line no-undef
    window.print()
  }

  rowProps(state, rowInfo){
    if (rowInfo)
      return {
        index: rowInfo.index,
        id: rowInfo.index,
        moverow: this.props.page.tableModel.move
      }
    else
      return {}
  }

  render() {
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
            showPagination={false}
            pageSize={(this.props.page.tableModel.data.length < 5) ? 5 : this.props.page.tableModel.data.length}
            loading={this.props.page.tableModel.loading}
            TrComponent={DraggableRow}
            getTrProps={this.rowProps}
          />
        </div>
        <div className="row justify-content-center">
          <ButtonGroup>
            <ButtonDefault className="btn-outline-secondary" onClick={this.printClick} text="Print"/>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}
