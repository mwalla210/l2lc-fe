import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DraggableRow from './draggableRow'
import ReactTable from 'react-table'

//Go into table component and copy from the render function the section for button content starting with let button = null
//Replace the top div stuff between table.js and here

@DragDropContext(HTML5Backend) @inject('page') @observer
export default class DraggableTable extends Component {
  constructor(){
    super()
    this.rowProps = this.rowProps.bind(this)
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
      return (
      <div className="row justify-content-center">
        <ReactTable
          data={this.props.page.tableModel.data.slice()}
          columns={this.props.page.tableModel.columns.slice()}
          showPagination={false}
          pageSize={this.props.page.tableModel.data.length}
          loading={this.props.page.tableModel.loading}
          TrComponent={DraggableRow}
          getTrProps={this.rowProps}
        />
      </div>
    )
  }
}
