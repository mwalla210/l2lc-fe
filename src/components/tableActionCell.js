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
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject('website', 'page')
export default class TableActionCell extends Component {
  static propTypes = {
    row: PropTypes.object.isRequired,
    // Full: all three items; Restricted: no delete
    set: PropTypes.oneOf(['Full', 'Restricted']).isRequired,
    clickHandler: PropTypes.func.isRequired,
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
    let full = this.props.set == 'Full'
    return (
      <span>
        <span>
          <CircleButton iconName="info" onClick={this.infoClick}/>
          {(full) ?
            <CircleButton iconName="pencil" onClick={this.editClick}/> :
            <CircleButton styleProps={{marginLeft: '2px'}} iconName="pencil" onClick={this.editClick}/>
          }
          {full && <CircleButton styleProps={{marginLeft: '2px'}} iconName="trash" onClick={this.deleteClick}/>}
        </span>
      </span>
    )
  }
}
