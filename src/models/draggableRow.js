import { action, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name DraggableRow
 * @class DraggableRow
 * @classdesc Draggable row state for draggable tables
 */
export default class DraggableRow {
  constructor(){
    let addtlProps = {
      data: [
        {
          required: true,
          title: 'Task Index 2',
          processArea: '',
          status: ''
        },
        {
          required: true,
          title: 'Task Index 1',
          processArea: '',
          status: ''
        },
        {
          required: true,
          title: 'Task Index 3',
          processArea: '',
          status: ''
        },
      ]
    }
    extendObservable(this, addtlProps)
    autoBind(this)
  }

  // Take item at dragIndex, remove it from list, and insert it at hoverIndex
  @action move(dragIndex, hoverIndex){
    // At dragIndex, remove 1 item
    let row = this.data.splice(dragIndex, 1)
    // If was trying to replace with last item in list, just push
    // hoverIndex will now be greater than data length, can't use splice
    if (hoverIndex > this.data.length)
      this.data.push(row[0])
    else{
      // At hoverIndex, remove 0 items and add row
      this.data.splice(hoverIndex, 0, row[0])
    }
  }
}
