import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SplitButton } from 'react-bootstrap'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'

export default class ProjectStatusFilter extends Component {
  static propTypes = {
    filter: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props){
    super(props)
    this.checkChange = this.checkChange.bind(this)
  }

  checkChange(val){
    this.props.onChange(val)
  }

  render(){
    return (
      <SplitButton
        bsSize="small"
        title="Filter"
        id="split-button-small"
      >
        <CheckboxGroup
          name="Filters"
          value={this.props.filter ? this.props.filter.value : []}
          onChange={this.checkChange}
        >
          <label style={{marginLeft: '8px'}}><Checkbox value="Received"/> Received</label>
          <br/>
          <label style={{marginLeft: '8px'}}><Checkbox value="In Progress"/> In Progress</label>
          <br/>
          <label style={{marginLeft: '8px'}}><Checkbox value="On Hold"/> On Hold</label>
          <br/>
          <label style={{marginLeft: '8px'}}><Checkbox value="Completed"/> Completed</label>
          <br/>
          <label style={{marginLeft: '8px'}}><Checkbox value="Dropped"/> Dropped</label>
          <br/>
        </CheckboxGroup>
      </SplitButton>
    )
  }
}
