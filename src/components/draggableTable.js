import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DraggableRow from './draggableRow'
import ReactTable from 'react-table'

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
        moverow: this.props.page.draggable.move
      }
    else
      return {}
  }

  render() {
      return (
      <div className="row justify-content-center">
        <div className="col-6">
          <ReactTable
            data={this.props.page.draggable.data.slice()}
            columns={this.props.page.draggable.columns.slice()}
            showPagination={false}
            defaultPageSize={this.props.page.draggable.data.length}
            TrComponent={DraggableRow}
            getTrProps={this.rowProps}
          />
        </div>
      </div>
    )
  }
}
