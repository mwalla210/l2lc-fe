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

/**
 * DraggableTable component; constructor binds functions; reclass of ReactTable
 * @namespace DraggableTable
 * @extends React.Component
 * @see {@link https://github.com/react-dnd/react-dnd React DnD}
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@DragDropContext(HTML5Backend) @inject('page', 'website') @observer
export default class DraggableTable extends Component {
  constructor(props){
    super(props)
    this.rowProps = this.rowProps.bind(this)
    this.printClick = this.printClick.bind(this)
    this.confirmOnClick = this.confirmOnClick.bind(this)
    this.props.page.tableModel.confirmAndClose = this.props.page.tableModel.confirmAndClose.bind(this.props.page.tableModel)
    this.props.page.tableModel.closeModal = this.props.page.tableModel.closeModal.bind(this.props.page.tableModel)
    this.props.page.tableModel.openModal = this.props.page.tableModel.openModal.bind(this.props.page.tableModel)
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
  /**
   * Initializes row index, id, and moverow function if row has content
   * @method rowProps
   * @param  {Object} [state]   Table state
   * @param  {Object} rowInfo   Row object
   * @return {Object}
   * @memberof DraggableTable.prototype
   */
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
  /**
   * Calls confirmAndClose for delete modal
   * @method confirmOnClick
   * @memberof DraggableTable.prototype
   */
  confirmOnClick(){
    this.props.page.tableModel.confirmAndClose()
  }

  /**
   * Renders HTML div component, with TableButton, DeleteModal, ReactTable, and ButtonGroup (with ButtonDefault)
   * @method render
   * @memberof DraggableTable.prototype
   * @return {Component}
   * @see {@link TableButton}
   * @see {@link DeleteModal}
   * @see {@link https://react-table.js.org ReactTable}
   * @see {@link https://reactstrap.github.io/components/button-group/ Reactstrap.ButtonGroup}
   * @see {@link ButtonDefault}
   * @see {@link DraggableRow}
   */
  render() {
    return (
      <div>
        <DeleteModal
          title={this.props.page.tableModel.deleteModal.title}
          confirmOnClick={this.confirmOnClick}
          denyOnClick={this.props.page.tableModel.closeModal}
          open={this.props.page.tableModel.modalOpen}
          closeFn={this.props.page.tableModel.closeModal}
          content={this.props.page.tableModel.deleteModal.content}
        />
        <div>
          <TableButton
            title={this.props.page.tableModel.tableButton.title}
            onClick={this.props.page.tableModel.tableButton.onClick}
          />
        </div>
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
        <br/>
        <label>{'Notes'}</label>
        <div className="row justify-content-center">
          <textarea
            className="form-control"
            type="text"
            id="notes"
            value={this.props.website.currentProject.notes}
            rows="3"
            onChange={this.props.website.currentProject.changeNotes}
          />
          <ButtonGroup>
            <ButtonDefault className="btn-outline-secondary" onClick={this.printClick} text="Print"/>
            <ButtonDefault className="btn-secondary" onClick={this.props.page.tableModel.backButtonFunc} text="Back"/>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}
