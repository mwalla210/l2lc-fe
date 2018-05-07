import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircleButton from './circleButton'
import { inject } from 'mobx-react'

/**
 * TableActionCell component; constructor binds functions
 * @namespace TableActionCell
 * @property {Object} row Table row
 * @property {String} set One of ['Full'|'Restricted']
 * @property {Function} clickHandler Icon click function
 * @property {Boolean} disabledChange Edit icon click disable flag
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject('website', 'page')
export default class TableActionCell extends Component {
  static propTypes = {
    row: PropTypes.object.isRequired,
    // Full: all three items; Restricted: no delete
    set: PropTypes.oneOf(['Full', 'Restricted', 'View', 'Delete']).isRequired,
    clickHandler: PropTypes.func.isRequired,
    disabledChange: PropTypes.bool,
  }

  constructor(props){
    super(props)
    this.infoClick = this.infoClick.bind(this)
    this.editClick = this.editClick.bind(this)
    this.deleteClick = this.deleteClick.bind(this)
  }

  /**
   * On click function for info icon
   * @method infoClick
   * @memberof TableActionCell.prototype
   */
  infoClick(){
    this.props.clickHandler(this.props.row, 'info')
  }

  /**
   * On click function for edit icon
   * @method editClick
   * @memberof TableActionCell.prototype
   */
  editClick(){
    this.props.clickHandler(this.props.row, 'edit')
  }

  /**
   * On click function for delete icon
   * @method deleteClick
   * @memberof TableActionCell.prototype
   */
  deleteClick(){
    this.props.clickHandler(this.props.row, 'delete')
  }

  /**
   * Renders HTML span component containing CircleButtons
   * @method render
   * @memberof TableActionCell.prototype
   * @return {Component}
   * @see {@link CircleButton}
   */
  render(){
    let infoButton = null
    let editButton = null
    let deleteButton = null
    if (this.props.set == 'View'){
      infoButton = <CircleButton iconName="info" onClick={this.infoClick}/>
    }
    else if (this.props.set == 'Delete'){
      deleteButton = <CircleButton iconName="trash" onClick={this.deleteClick}/>
    }
    else {
      if (this.props.set == 'Full'){
        deleteButton = <CircleButton styleProps={{marginLeft: '2px'}} iconName="trash" onClick={this.deleteClick}/>
      }
      infoButton = <CircleButton iconName="info" onClick={this.infoClick}/>
      editButton = <CircleButton styleProps={{marginLeft: '2px'}} iconName="pencil" onClick={this.editClick} disabled={this.props.disabledChange}/>
    }
    return (
      <span>
        <span>
          {infoButton}
          {editButton}
          {deleteButton}
        </span>
      </span>
    )
  }
}
