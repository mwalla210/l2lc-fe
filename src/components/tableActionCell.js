import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircleButton from './circleButton'
import { inject } from 'mobx-react'

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

  infoClick(){
    this.props.clickHandler(this.props.row, 'info')
  }

  editClick(){
    this.props.clickHandler(this.props.row, 'edit')
  }

  deleteClick(){
    this.props.clickHandler(this.props.row, 'delete')
  }

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